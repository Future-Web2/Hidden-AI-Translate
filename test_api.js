const IO_NET_API_KEY = 'io-v2-eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6IjE4Y2UxMmEzLWRhNDQtNGZmNy1hYTU5LTVjZjE2NGEzZDkwZiIsImV4cCI6NDkyODIwMjAwNH0.TYNApFo6gQYmv15VFc4NPp3SRpdgRc1tymZjJiwH3lU2WSxArW9vNRxGI3cav5_JSJ9aIErxe6TURQJZkVcy-g';
const IO_NET_API_URL = 'https://api.intelligence.io.solutions/api/v1/chat/completions';
const IO_NET_MODEL = 'meta-llama/Llama-3.3-70B-Instruct';

async function test() {
    console.log("Fetching API...");
    try {
        const res = await fetch(IO_NET_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${IO_NET_API_KEY}`
            },
            body: JSON.stringify({
                model: IO_NET_MODEL,
                messages: [{ role: 'user', content: 'hello' }],
                max_tokens: 10
            })
        });
        const data = await res.json();
        console.log("Status:", res.status);
        console.log("Response:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error:", err);
    }
}
test();
