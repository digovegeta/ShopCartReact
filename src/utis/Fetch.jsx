export default async function Fetch(url) {
    const response = await fetch(url);
    const json = await response.json();
    
    return json;
}
