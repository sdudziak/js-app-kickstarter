export interface PropertyProcessor {
    /**
     * @param data
     * @throws PropertyProcessorError
     */
    process<T>(data: Object|any): T;
}
