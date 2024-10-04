const findAvailableTable =  (tables: boolean[]): number => {
    return tables.findIndex(table => table === true)
}

const findAvailableTableAsync =  async (tables: boolean[]): Promise<number> => {
    return new Promise((resolve) => {
        resolve(tables.findIndex(table => table === true))
    })
}