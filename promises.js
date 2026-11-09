const loadData=new Promise((resolve) => { setTimeout(()=>resolve("Data loaded!"),1000);});
loadData.then(result=>console.log(result));