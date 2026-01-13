function parseTemplate(htmlContent: string, data: Record<string, any>) {
    // Regular expression to match {{key:default}} pattern
    const templateRegex = /\{\{(\w+):([^}]+)\}\}/g;
    
    // Replace all matches with either the data value or default
    return htmlContent.replaceAll(templateRegex, (match: string, key: string, defaultValue: string) => {
        return data.hasOwnProperty(key) ? data[key] : defaultValue;
    });
}



function extractTemplateKeys(htmlContent: string): Record<string, string> {
    const templateRegex = /\{\{(\w+):([^}]+)\}\}/g;
    const templateData: Record<string, string> = {};
    
    let match;
    while ((match = templateRegex.exec(htmlContent)) !== null) {
        const [_, key, defaultValue] = match;
        templateData[key] = defaultValue;
    }
    
    return templateData;
}
// Export functions
export {
    parseTemplate,
    extractTemplateKeys
};