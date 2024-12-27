declare global {
    type ProcessOptions = { 
        inDirectory: string, 
        outDirectory: string,
        verbose?: boolean, 
        ignoreSound?: boolean 
    }
}

export type {};