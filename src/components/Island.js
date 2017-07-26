import React, { Component } from 'react';

const teamNames = [
  '新垣結1', 'W兩個動物', '友三', '兔4夾蛋', '五龍五濕', '你好6哦',
  '鼻要森七七', '天龍八布', '瑋魚杜九是厲害', '十力派大頭柴柴', '喔伊十一', '自十二果'
];
const teamID = ["1a", "1b", "1c", "1d", "1e", "1f", "2a", "2b", "2c", "2d", "2e", "2f", "3a", "3b", "3c", "3d", "3e", "3f", "4a", "4b", "4c", "4d", "4e", "4f", "5a", "5b", "5c", "5d", "5e", "5f", "6a", "6b", "6c", "6d", "6e", "6f", "7a", "7b", "7c", "7d", "7e", "7f", "8a", "8b", "8c", "8d", "8e", "8f", "9a", "9b", "9c", "9d", "9e", "9f", "10a", "10b", "10c", "10d", "10e", "10f", "11a", "11b", "11c", "11d", "11e", "11f", "12a", "12b", "12c", "12d", "12e", "12f"];
    

class Island extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 0
    }
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({ currentPage: (this.state.currentPage + 1) % 4 });
  }

  render() {
    const { currentPage } = this.state;
    console.log(currentPage);
    const showTitle = (() => {
      switch (currentPage) {
        case 0: return '金錢排名';
        case 1: return '戰鬥排名';
        case 2: return '監獄';
        case 3: return '競技場佔領';
      }
    })();

    const showContent = (() => {
      switch (currentPage) {
        case 0:
          let maxMoneyTeam, maxMoneyPlayer, maxMoneyByTeam = 0, maxMoneyByPlayer = 0;
          for (let i = 1; i <= 12; ++i) {
            let teamMoney = 0;
            ['a', 'b', 'c', 'd', 'e', 'f'].forEach((item) => {
              const playerMoney = this.props.teams[String(i) + item]['money'];
              if (playerMoney > maxMoneyByPlayer) {
                maxMoneyByPlayer = playerMoney;
                maxMoneyPlayer = String(i) + item;
              }
              teamMoney += playerMoney;
            });
            if (teamMoney > maxMoneyByTeam) {
              maxMoneyByTeam = teamMoney;
              maxMoneyTeam = i;
            }
          }

          return (
            <div>
              <div className="row" style={{'marginTop': '10%'}}>
                <div className="col-3"><b>最多金錢小隊</b></div>
                <div className="col-3" style={{'textAlign': 'center'}}>第{maxMoneyTeam}小隊</div>
                <div className="col-3">{teamNames[maxMoneyTeam - 1]}</div>
                <div className="col-3">{maxMoneyByTeam}元</div>
              </div> 
              <div className="row" style={{'marginTop': '10%'}}>
                <div className="col-3"><b>最多金錢組別</b></div>
                <div className="col-4" style={{'textAlign': 'center'}}>{maxMoneyPlayer}小組</div>
                <div className="col-5">{maxMoneyByPlayer}元</div>
              </div> 
            </div>
          );
        case 1:
          let maxKill = 0, maxKillTeam = [], maxDeath = 0, maxDeathTeam = [], maxHead = 0, maxHeadTeam = [];
          teamID.forEach((item) => {
            const { kill, death, head } = this.props.teams[item];
            if (kill > maxKill) {
              maxKill = kill;
              maxKillTeam = [item];
            } else if (kill === maxKill) {
              maxKillTeam = [item, ...maxKillTeam];
            }
            if (head > maxHead) {
              maxHead = head;
              maxHeadTeam = [item];
            } else if (head === maxHead) {
              maxHeadTeam = [item, ...maxHeadTeam];
            }
            if (death > maxDeath) {
              maxDeath = death;
              maxDeathTeam = [item];
            } else if (death === maxDeath) {
              maxDeathTeam = [item, ...maxDeathTeam];
            }
          });
          
          return (
            <div>
              <div className="row">
                <div className="col-4" style={{'textAlign': 'center'}}><b>殺敵最多</b></div>
                <div className="col-4" style={{'textAlign': 'center'}}><b>收頭最多</b></div>
                <div className="col-4" style={{'textAlign': 'center'}}><b>被殺最多</b></div>
              </div> 
              <div className="row">
                <div className="col-4">
                  <div className="row">{
                  maxKillTeam.slice(0, 10).map((item, key) => 
                    <div className="col-12" style={{'textAlign': 'center'}}>
                      {item}
                    </div>
                  )
                }</div></div>
                <div className="col-4">
                  <div className="row">{
                    maxHeadTeam.slice(0, 10).map((item, key) => 
                      <div className="col-12" style={{'textAlign': 'center'}}>
                        {item}
                      </div>
                    )
                  }</div></div>
                <div className="col-4">
                  <div className="row">{
                    maxDeathTeam.slice(0, 10).map((item, key) => 
                      <div className="col-12" style={{'textAlign': 'center'}}>
                        {item}
                      </div>
                    )
                }</div></div>
              </div> 
            </div>
          );
        case 2:
          let inJailCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          teamID.forEach((item) => {
            if (this.props.teams[item]['jail'] === 'in')
              inJailCount[Number(item.slice(0, -1)) - 1] += 1;
          });
          const d = new Date();
          const countdown = this.props.env.jailTimestamp === 0 ? 0 : 1000 * 60 * 20 - d.getTime() + this.props.env.jailTimestamp;
          const countdownShow = String(Math.floor(countdown/60000)) + ':' + String(Math.floor((countdown % 60000)/1000));
          return (
            <div>
              <div className="row">
                <div className="col-2"><b>1小</b></div>
                <div className="col-2"><b>2小</b></div>
                <div className="col-2"><b>3小</b></div>
                <div className="col-2"><b>4小</b></div>
                <div className="col-2"><b>5小</b></div>
                <div className="col-2"><b>6小</b></div>
              </div> 
              <div className="row">
                <div className="col-2">{inJailCount[0]}組</div>
                <div className="col-2">{inJailCount[1]}組</div>
                <div className="col-2">{inJailCount[2]}組</div>
                <div className="col-2">{inJailCount[3]}組</div>
                <div className="col-2">{inJailCount[4]}組</div>
                <div className="col-2">{inJailCount[5]}組</div>
              </div> 
              <div className="row" style={{'marginTop': '10%'}}>
                <div className="col-2"><b>7小</b></div>
                <div className="col-2"><b>8小</b></div>
                <div className="col-2"><b>9小</b></div>
                <div className="col-2"><b>10小</b></div>
                <div className="col-2"><b>11小</b></div>
                <div className="col-2"><b>12小</b></div>
              </div> 
              <div className="row">
                <div className="col-2">{inJailCount[6]}組</div>
                <div className="col-2">{inJailCount[7]}組</div>
                <div className="col-2">{inJailCount[8]}組</div>
                <div className="col-2">{inJailCount[9]}組</div>
                <div className="col-2">{inJailCount[10]}組</div>
                <div className="col-2">{inJailCount[11]}組</div>
              </div> 
              <div className="row" style={{'marginTop': '10%'}}>
                <div className="col-6" style={{'textAlign': 'right'}}><b>處刑倒數時間</b></div>
                <div className="col-6"><b>{countdownShow}</b></div>
              </div> 
            </div>
          );
        case 3: return (
            <div>
              <div className="row" style={{'marginTop': '10%', 'textAlign': 'center'}}>
                <div className="col-6"><b>掩埋場競技場</b></div>
                <div className="col-6">{this.props.arenas['1']['team']}</div>
              </div> 
              <div className="row" style={{'marginTop': '10%', 'textAlign': 'center'}}>
                <div className="col-6"><b>墓園競技場</b></div>
                <div className="col-6">{this.props.arenas['2']['team']}</div>
              </div> 
              <div className="row" style={{'marginTop': '10%', 'textAlign': 'center'}}>
                <div className="col-6"><b>岩窟競技場</b></div>
                <div className="col-6">{this.props.arenas['3']['team']}</div>
              </div> 
            </div>
          );;
      }
    })();

    return (
      <div className="container">
        <div className="row bulletin-title">
          <div className="col-12">
            {showTitle}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {showContent}
          </div>
        </div> 
      </div>
    );
  }
}

export default Island;
