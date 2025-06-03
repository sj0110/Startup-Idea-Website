export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}
export function formatViews(views: number) {
  if (typeof views !== 'number' || isNaN(views)) {
    return '0 view'
  }
  else if (views <= 0) {
    return '0 view'
  }
  else if (views === 1) {
    return '1 view'
  }
  else if (views < 1000) {
    return `${views.toString()} views`
  }
  else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K views`
  }
  else if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`
  }
  else if (views >= 1000000000) {
    return `${(views / 1000000000).toFixed(1)}B views`
  }
  return views.toString()
}

export function pareseServerActionResponse<T>(response: T): T {
  return JSON.parse(JSON.stringify(response));
} 