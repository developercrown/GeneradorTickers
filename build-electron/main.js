const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain  } = require('electron'); // <-- Añade Tray, Menu y nativeImage
const path = require('path');
const devMode = false;
let mainWindow;
let tray = null;
let appIsQuitting = false; // <-- Define esta variable para controlar el cierre

function createWindow() {
    const iconPath = path.join(__dirname, 'ticket.png');
    if (process.platform === 'win32') {
        app.setAppUserModelId('TicketGenerator.DevCrown'); // Identificador único
    }
    mainWindow = new BrowserWindow({
        width: 1120,
        height: 880,
        fullscreen: false,
        resizable: false,
        icon: iconPath,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true//!devMode ? true : false,
        }
    });

    mainWindow.setMenu(null);

    // Carga la URL en modo desarrollo o el archivo en producción
    devMode 
        // ? mainWindow.loadURL("http://192.168.100.15:5173")
        ? mainWindow.loadURL("http://localhost:5173")
        : mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));

    // Intenta cargar el ícono de la bandeja (usa try-catch para evitar errores)
    try {

        // Configura el ícono de la app (importante para Windows)
        
        const trayIcon = nativeImage.createFromPath(iconPath);
        tray = new Tray(trayIcon.resize({ width: 16, height: 16 })); // Redimensiona si es necesario

        const contextMenu = Menu.buildFromTemplate([
            { label: 'Restaurar', click: () => mainWindow.show() },
            { label: 'Salir', click: () => { appIsQuitting = true; app.quit(); } }
        ]);

        tray.setToolTip('TicketGenerator 1.0 - DevCrown Software 2025');
        tray.setContextMenu(contextMenu);

        // Minimizar a la bandeja
        mainWindow.on('minimize', (event) => {
            event.preventDefault();
            mainWindow.hide();
        });

        // Restaurar al hacer doble clic en el ícono
        tray.on('double-click', () => mainWindow.show());

        // Evitar cierre real si no se hizo clic en "Salir"
        mainWindow.on('close', (event) => {
            if (!appIsQuitting) {
                event.preventDefault();
                mainWindow.hide();
            }
        });

    } catch (error) {
        console.error('Error al cargar el ícono de la bandeja:', error);
    }

    // DevTools solo en desarrollo
    if (devMode) mainWindow.webContents.openDevTools();
}


app.whenReady().then(()=>{
    createWindow();

    const defaultPrinterName = '\\\\192.168.100.210\\POS58 Printer';

    ipcMain.handle('soft-reboot', async (event)=> {
        console.log("action to reboot");
        const window = BrowserWindow.fromWebContents(event.sender);
    
        // Opción 1: Recarga suave primero
        // event.sender.send('soft-reboot');
        
        // Opción 2: Si falla, recarga completa después de un tiempo
        setTimeout(() => {
            if (window && !window.isDestroyed()) {
                window.reload();
            }
        }, 250);
    });

    ipcMain.handle('print-ticket', async (event, htmlContent) => {
        // 1. Crear ventana de impresión con dimensiones específicas
        const printWindow = new BrowserWindow({
            show: true,  // Mostrar ventana para depuración (puedes cambiar a false en producción)
            width: 250,  // Ancho en píxeles
            height: 720, // Alto en píxeles
            title: 'TicketGenerator - Impresión',
            webPreferences: {
                webSecurity: false,
                nodeIntegration: true,
                contextIsolation: false
            }
        });

        printWindow.setMenu(null);
    
        try {
            // 2. Cargar el contenido HTML
            await printWindow.loadURL(`data:text/html;charset=UTF-8,${encodeURIComponent(htmlContent)}`);
    
            // 3. Esperar a que el contenido esté completamente cargado
            await new Promise((resolve) => {
                printWindow.webContents.on('did-finish-load', resolve);
                // Timeout de seguridad (5 segundos)
                setTimeout(resolve, 150);
            });
    
            // 4. Configurar opciones de impresión
            const printOptions = {
                silent: false,          // Mostrar diálogo de impresión
                printBackground: true,  // Imprimir fondos
                // deviceName: 'POS58 Printer en 192.168.100.210', // Ruta de red para impresora
                deviceName: defaultPrinterName, // Ruta de red para impresora
                pageSize: {
                    height: 100000,    // Altura suficiente para contenido dinámico
                    width: 58000       // 58mm en hundredths of millimeters
                },
                margins: {
                    marginType: 'none' // Sin márgenes
                }
            };
    
            // 5. Ejecutar la impresión automáticamente
            const printSuccess = await new Promise((resolve) => {
                printWindow.webContents.print(printOptions, (success) => {
                    printWindow.close();
                    resolve(success);
                });
            });
            console.log(printSuccess);
            
            return { success: printSuccess };
    
        } catch (error) {
            printWindow.close();
            console.error('Error en el proceso de impresión:', error);
            return { success: false, error: error.message };
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});