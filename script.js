async function getImagesUrl() {
    const url = 'https://65d7137927d9a3bc1d7a1726.mockapi.io/chocoFoodPromotion'
        const response = await fetch(url);
        const data = await response.json();
        const imgUrl = data.url;
        return imgUrl;
}

async function promationImage() {
    try {
        const imgUrl = await getImagesUrl();
        const img = document.querySelector('-b-block').src = imgUrl;
    } catch (error) {console.log(error);}
}

promationImage()