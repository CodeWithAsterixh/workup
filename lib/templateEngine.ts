// function parseTemplate(htmlContent: string, data: Record<string, any>) {
//     // Regular expression to match {{key:default}} pattern
//     const templateRegex = /\{\{(\w+):([^}]+)\}\}/g;
    
//     // Replace all matches with either the data value or default
//     return htmlContent.replace(templateRegex, (match: string, key: string, defaultValue: string) => {
//         return data.hasOwnProperty(key) ? data[key] : defaultValue;
//     });
// }

// // Example usage:
// function updateCardContent(htmlPath: string, data: Record<string, any>) {
//     // const fs = require('fs');
    
//     // // Read HTML file
//     // let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
//     // // Parse and replace templates
//     // const updatedContent = parseTemplate(htmlContent, data);
    
//     // return updatedContent;
// }

// function extractTemplateKeys(htmlContent: string): Record<string, string> {
//     const templateRegex = /\{\{(\w+):([^}]+)\}\}/g;
//     const templateData: Record<string, string> = {};
    
//     let match;
//     while ((match = templateRegex.exec(htmlContent)) !== null) {
//         const [_, key, defaultValue] = match;
//         templateData[key] = defaultValue;
//     }
    
//     return templateData;
// }
// // Export functions
// export {
//     extractTemplateKeys, parseTemplate,
//     updateCardContent
// };
// // const cardData = {
// //     companyName: "TechCorp Inc",
// //     fullName: "Jane Smith",
// //     jobTitle: "Product Manager",
// //     phone: "+1 (555) 987-6543",
// //     email: "jane.smith@techcorp.com",
// //     website: "www.techcorp.com",
// //     logoUrl: "/techcorp-logo.png"
// // };