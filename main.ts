const getForecast = (url: string, information: HTMLTableElement):void => {
//   get forecast fetching url
    fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      const data = json[0].timeSeries[0].areas;
      const times:string[] = ["今日", "明日", "明後日"];
    //   create thead
      const thead = information.createTHead();
      const h_row = thead.insertRow();
      h_row.appendChild(document.createElement("th"));
      for (let index = 0; index < times.length; index++) {
        const h_thobj = document.createElement("th");
        h_thobj.innerHTML = times[index];
        h_row.appendChild(h_thobj);
    }
    //   create table(tbody)
    for (let i = 0; i < data.length; i++) {
        console.log(data[i].area.name);
        const row = information.insertRow();
        const thobj = document.createElement("th");
        thobj.innerHTML = data[i].area.name;
        row.appendChild(thobj);
        for (let j = 0; j < times.length; j++) {
          row.insertCell().textContent = data[i].weathers[j];
          console.log(data[i].weathers[j]);
        }
      }
    });
};

window.onload = () => {
  const information = <HTMLTableElement>document.getElementById("infomation");
  const pref = <HTMLInputElement>document.getElementById("pref");
  pref.addEventListener("change", () => {
    information.innerHTML = "";
    const pref_id = pref.value;
    const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${pref_id}.json`;
    getForecast(url, information);
    information.hidden = false;
  });
};
