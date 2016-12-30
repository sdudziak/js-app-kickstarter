export interface ITemplating {
    /**
     * This method will render the given template.
     * @param templateName remember that this will be relative path to <root_dir>/src/server/view
     * @param options
     */
    renderFile(templateName: string, options?: any): string;
}
