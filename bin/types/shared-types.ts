declare global {
    type BuildOptions = { 
        inDirectory: string, 
        outDirectory: string, 
        resourcePath?: string, 
        verbose?: boolean, 
        ignoreSound?: boolean 
    }
}

export { BuildOptions };