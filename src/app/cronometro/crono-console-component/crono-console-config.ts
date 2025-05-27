export interface CronoConsoleConfig {
    mostrarEstado?: boolean;
    mostrarSentido?: boolean;
    mostrarBotones?: boolean;
    formatoTiempo?: "segundos" | "completo";
    botones?: Partial<Record<'start' |'pause' |'resume' |'up' |'down' |'reset', string>>;    
}
