var ctx = null;
var but = document.getElementsByClassName("btn")[0];
myChart = null;
myChart2 = null;
var cnt = 0;
but.addEventListener("click",function(){
        var dt = document.getElementById("item_date").value;
        var typ = document.getElementById("type").value;
        fetch('./hw.json')
        .then((results) => {
            return results.json();
        })
        .then((res) => {
            console.log(res);
            function time_mod(time) {
                var hours = parseInt(time.slice(0,2));
                var minutes = parseInt(time.slice(3,5));
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12;
                minutes = minutes < 10 ? '0'+minutes : minutes;
                return [hours,minutes,ampm];
            }
            var mp = new Map();
            var mptime = new Map();
            for(var i=0;i < res.length;i++){
                console.log(i)
                let date = res[i]["schedule_time"].split(" ")[0]
                let time = res[i]["schedule_time"].split(" ")[1]
                var arr = time_mod(time);
                var h = arr[0];
                var ampm = arr[2];
                if(ampm === "am"){
                    if(mptime[date + "9 to 12"]){
                        mptime[date + "9 to 12"]++;
                    }
                    else{
                        mptime[date + "9 to 12"] = 1;
                    }
                }
                else if(ampm == 'pm' && h === 12){
                    if(mptime[date + "12 to 3"]){
                        mptime[date + "12 to 3"]++;
                    }
                    else{
                        mptime[date + "12 to 3"] = 1;
                    }
                }
                else if(h <= 2){
                    if(mptime[date + "12 to 3"]){
                        mptime[date + "12 to 3"]++;
                    }
                    else{
                        mptime[date + "12 to 3"] = 1;
                    }
                }
                else if(h >= 3 && h <= 5){
                    if(mptime[date + "3 to 5"]){
                        mptime[date + "3 to 5"]++;
                    }
                    else{
                        mptime[date + "3 to 5"] = 1;
                    }
                }
                else if(h >= 6 && h < 10){
                    if(mptime[date + "6 to 9"]){
                        mptime[date + "6 to 9"]++;
                    }
                    else{
                        mptime[date + "6 to 9"] = 1;
                    }
                }
                
                if(mp[date]){
                    mp[date]++;
                }
                else{
                    mp[date] = 1;
                }
            }
            console.log(mp);
            console.log(mptime);
            var res1 = new Date(dt)
            var res2 = new Date(dt)
            var res3 = new Date(dt)
            // console.log(res)
            res1.setDate(res1.getDate()-3)
            res2.setDate(res2.getDate()-2)
            res3.setDate(res3.getDate()-1)
            // console.log(res.toISOString().split('T')[0]);
            var ctx = document.getElementById("myChart").getContext("2d");
            dt1 = res1.toISOString().split('T')[0];
            dt2 = res2.toISOString().split('T')[0];
            dt3 = res3.toISOString().split('T')[0];
            // if(myChart instanceof Chart){
            //     myChart.destroy();
            // }

            but.addEventListener("click",function(){
                myChart.destroy();
                typ = document.getElementById("type").value;
            })
            var myChart = new Chart(ctx,{
                type:typ,
                data: {
                    labels: ["Scheduled at " + dt1,"Scheduled at " + dt2,"Scheduled at " + dt3],
                    datasets: [
                        {
                            data: [mp[dt1],mp[dt2],mp[dt3]],
                            label: "Scheduling Patterns",
                            backgroundColor: [
                                "rgba(255,99,132,0.7)",
                                "rgba(54,162,235,0.7)",
                                "rgba(255,206,86,0.7)"
                            ],
                            borderColor:[
                                "rgba(255,99,132,1)",
                                "rgba(54,162,235,1)",
                                "rgba(255,206,86,1)"
                            ]

                        },
                    ]
                },
                options:{
                    responsive: false
                }
            })
            if(cnt === 0){
                var ele = document.createElement("select");
                ele.name = "type"
                ele.id = "type2"
                var option1 = document.createElement("option")
                option1.value = dt1
                option1.innerText = `On ${dt1}`
                var option2 = document.createElement("option")
                option2.value = dt2
                option2.innerText = `On ${dt2}`
                var option3 = document.createElement("option")
                option3.value = dt3;
                option3.innerText = `On ${dt3}`
                ele.appendChild(option1)
                ele.appendChild(option2)
                ele.appendChild(option3)
                var button = document.createElement("button")
                button.type = "button";
                button.className = "btn btn-danger";
                button.id = "sec_but";
                button.innerText = "Visualize"
                var bd = document.getElementsByTagName("body")[0]
                bd.appendChild(ele)
                var br = document.createElement("br")
                bd.appendChild(br)
                bd.appendChild(button);
                cnt++;
            }
            
                but.addEventListener("click",function(){
                    var bd2 = document.getElementsByTagName("body")[0];
                    var button = document.createElement("button")
                    button.type = "button";
                    button.className = "btn btn-danger";
                    button.id = "sec_but"
                    button.innerText = "Visualize"
                    bd2.replaceChild(button,bd2.lastChild);
                    var ele = document.createElement("select");
                    ele.name = "type"
                    ele.id = "type2"
                    var option1 = document.createElement("option")
                    option1.value = dt1
                    option1.innerText = `On ${dt1}`
                    var option2 = document.createElement("option")
                    option2.value = dt2
                    option2.innerText = `On ${dt2}`
                    var option3 = document.createElement("option")
                    option3.value = dt3;
                    option3.innerText = `On ${dt3}`
                    ele.appendChild(option1)
                    ele.appendChild(option2)
                    ele.appendChild(option3)
                    var dr = document.getElementById("type2");
                    bd2.replaceChild(ele,dr);

                })
            var ctx2 = document.getElementById("myChart2");
            var sec_but = document.getElementById("sec_but");
            sec_but.addEventListener("click",function(){
                var val = document.getElementById("type2").value
                var ctx2 = document.getElementById("myChart2");
                sec_but.addEventListener("click",function(){
                    myChart2.destroy();
                    val = document.getElementById("type2").value
                })
                
                var myChart2 = new Chart(ctx2,{
                    type:"bar",
                    data: {
                        labels:["9am to 12pm","12pm to 3pm","3pm to 6pm","6pm to 9pm"],
                        datasets:[
                            {
                                data:[mptime[val + "9 to 12"],mptime[val + "12 to 3"],mptime[val + "3 to 6"],mptime[val + "6 to 9"]],
                                label: "Scheduling patterns",
                                backgroundColor:[
                                    "rgba(255,99,132,0.7)",
                                    "rgba(54,162,235,0.7)",
                                    "rgba(255,206,86,0.7)",
                                    "rgba(67,161,85,0.7)"
                                ],
                                borderColor:[
                                    "rgba(255,99,132,1)",
                                    "rgba(54,162,235,1)",
                                    "rgba(255,206,86,1)",
                                    "rgba(67,161,85,1)"
                                ]
                            },
                        ]
                    },
                    options:{
                        responsive:false
                    }
                })
                sec_but.addEventListener("click",function(){
                    myChart2.destroy();
                    val = document.getElementById("type2").value
                })
            })
            
            cnt++;
        });
        
})
