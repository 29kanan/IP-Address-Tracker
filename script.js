const searchInp = document.getElementById("search-inp");
const searchBtn = document.getElementById("search-btn");

const ipDisplay = document.getElementById("ip-add");
const locDisplay = document.getElementById("loc");
const timeDisplay = document.getElementById("timezone");
const ispDisplay = document.getElementById("isp");

const API_KEY = 'at_2NeIy41ObMgFo1JNg1tBGEIcbAvzn'; 
const BASE_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`;


let map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(map);
const myIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [46, 56],
    iconAnchor: [23, 56]
});
let marker = L.marker([51.505, -0.09], {icon: myIcon}).addTo(map);

async function searchIP(ipAddress){
    try{
        const res = await fetch(`${BASE_URL}&ipAddress=${ipAddress}`);
        const data = await res.json();
        
        ipDisplay.innerText = '';
        locDisplay.innerText = '';
        timeDisplay.innerText = '';
        ispDisplay.innerText = '';

        ipDisplay.innerText = data.ip;
        locDisplay.innerText = `${data.location.city}, ${data.location.region}`;
        timeDisplay.innerText = data.location.timezone;
        ispDisplay.innerText = data.isp;

        const { lat, lng } = data.location;
        map.setView([lat, lng], 13);
        marker.setLatLng([lat, lng]);
    }catch (error) {
        console.error('Error:', error);
        alert('Something went wrong!');
    }
}

searchBtn.addEventListener('click', () => {
    const ipInput = searchInp.value;
    if(ipInput !== ''){
        searchIP(ipInput);
    }
});

searchInp.addEventListener('keypress', (e) => {
    const ipInput = searchInp.value;
    if(e.key === 'Enter'){
        searchIP(ipInput);
    }
});

async function getUserIP(){
    try {
        const ipRes = await fetch(`${BASE_URL}`);
        const ipData = res.json();
        const userIP = ipData.ip;

        searchIP(userIP);
    }catch(error){
        console.error('Error fetching user IP:', error);
        searchIP('');
        alert('Something went wrong!');
    }
}

window.addEventListener('DOMContentLoaded', getUserIP);