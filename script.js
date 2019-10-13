const downloadBtn = document.querySelector('.download-button');
const URLinput = document.querySelector('.URL-input');

URLinput.addEventListener('click', ()=>
{
   console.log(`URL: ${URLinput.value}`);
   sendURL(URLinput.value);
});

function sendURL(URL) {


}
