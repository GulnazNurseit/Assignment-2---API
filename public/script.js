document.getElementById('btn').addEventListener('click', async () => {
    const res = await fetch('/api/random-user');
    const data = await res.json();
    const container = document.getElementById('result');

    container.innerHTML = `
        <div class="card">
            <img src="${data.user.picture}" width="150">
            <h2>${data.user.firstName} ${data.user.lastName}</h2>
            <p><strong>Gender:</strong> ${data.user.gender}</p>
            <p><strong>Age:</strong> ${data.user.age}</p>
            <p><strong>Date of Birth:</strong> ${new Date(data.user.dob).toLocaleDateString()}</p>
            <p><strong>City:</strong> ${data.user.city}</p>
            <p><strong>Country:</strong> ${data.country.name}</p>
            <p><strong>Address:</strong> ${data.user.address}</p>
        </div>

        <div class='card'>
  <h2>Country Information</h2>
  <p><strong>Country Name:</strong> ${data.country.name}</p>
  <p><strong>Capital City:</strong> ${data.country.capital}</p>
  <p><strong>Official Language(s):</strong> ${data.country.languages}</p>
  <p><strong>Currency:</strong> ${data.country.currency} (1 ${data.country.currency} = ${data.rates.USD} USD, ${data.rates.KZT} KZT)</p>
  <p><strong>National Flag:</strong></p>
  <img src='${data.country.flag}' width='120' class='flag'>
</div>


        <div class="card">
            <h2>News About This Country</h2>
            ${data.news.map(n => `
                <div class="news-item">
                    <a href="${n.url}" target="_blank">${n.title}</a>
                    <p>${n.description || ''}</p>
                    ${n.image ? `<img src="${n.image}" width="100%">` : ''}
                </div>
            `).join('')}
        </div>
    `;
});
