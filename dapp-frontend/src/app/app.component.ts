import { Component, OnInit } from '@angular/core';
declare var Web3: any;
declare let window: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dapp-frontend';
  web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
  connectedAccount = '';

  ngOnInit(): void {
    this.loadWeb3();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You Should consider using MetaMask!');
    }
  }

  connectToMetamask() {
    this.metamaskConnect();
  }

  async metamaskConnect() {
    this.connectedAccount = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
  }
}
