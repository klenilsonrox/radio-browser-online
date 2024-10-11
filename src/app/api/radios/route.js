export const GET = async (request) => {
    // Pegando o parâmetro offset da URL
    const { searchParams } = new URL(request.url);
    const offset = searchParams.get('offset') || 0; // Valor padrão de 0 se não houver offset

    const response = await fetch(`https://de1.api.radio-browser.info/json/stations/search?limit=10&offset=${offset}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    return new Response(JSON.stringify(data));
}
