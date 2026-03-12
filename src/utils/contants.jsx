export const googleapi="AIzaSyCz_YBQwlM-W4Iyxr9n9Iedfjjh3o7r4qQ"
export const Youtube_api='https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key='+googleapi
export const searchapi="https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="

// export function convert(num){
//     if(num>=100000){
//         return (num/100000).toFixed(1)+"M"

//     }
//     else if (num>=1000){
//         return (num/1000).toFixed(1)+"K"
//     }
   
//     else{
//         return num.toString()
//     }
// }

export function convert(num) {
    if (num === undefined || num === null) return ""

    const value = Number(num)

    if (isNaN(value)) return ""

    if (value >= 1_000_000_000) {
        return (value / 1_000_000_000).toFixed(1) + "B"
    }
    if (value >= 1_000_000) {
        return (value / 1_000_000).toFixed(1) + "M"
    }
    if (value >= 1_000) {
        return (value / 1_000).toFixed(1) + "K"
    }

    return value.toString()
}

export function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);

  const diffInMs = now - past;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays <= 0) return "Today";
  if (diffInDays === 1) return "1 day ago";
  return `${diffInDays} days ago`;
}