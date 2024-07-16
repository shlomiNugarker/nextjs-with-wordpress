import { format } from 'date-fns'

/**
 * formatDate
 */
export function formatDate(
  date: string | number | Date,
  pattern: string = 'PPP'
): string {
  return format(new Date(date), pattern)
}

/**
 * sortObjectsByDate
 */
interface SortOptions {
  key?: string;
}

interface DateObject {
  [key: string]: any;
}

export function sortObjectsByDate(
  array: DateObject[],
  { key = 'date' }: SortOptions = {}
): DateObject[] {
  return array.sort(
    (a, b) => new Date(b[key]).getTime() - new Date(a[key]).getTime()
  )
}
