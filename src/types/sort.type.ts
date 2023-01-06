export type SortColumn = {
  label: string, 
  accessor: string, 
  sortable: boolean,
  sortbyOrder?: string
}

export enum SortOrder {
  desc = 'desc',
  asc = 'asc'
}