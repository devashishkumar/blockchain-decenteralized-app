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
  web3 = new Web3(new Web3.providers.HttpProvider("HTTP://localhost:7545"));
  web3Api: any = {};
  provider: any;
  connectedAccount = '';
  blockchainAccounts: any = [];

  ngOnInit(): void {
    this.loadWeb3();

  }

  /**
   * assign web 3 instance in windows object
   */
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      this.provider = window.ethereum;
      await window.ethereum.enable;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      this.provider = window.web3.currentProvider;
    } else {
      window.alert('Non-Ethereum browser detected. You Should consider using MetaMask!');
    }
    this.web3Api = {
      web3: new Web3(this.provider),
      provider: this.provider
    };
  }

  /**
   * connect to metamask
   */
  connectToMetamask() {
    this.metamaskConnect();
  }

  /**
   * get current connected account in metamask
   */
  async metamaskConnect() {
    this.connectedAccount = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
  }

  /**
   * get blockchain accounts
   */
  async getBlockchainAccounts() {
    this.blockchainAccounts = await this.web3.eth.getAccounts();
    this.connectedAccount = this.blockchainAccounts[0];
  }

  /**
   * get metamask accounts
   */
  async getMetamaskAccount() {
    this.blockchainAccounts = await this.web3Api.web3.eth.getAccounts();
    this.connectedAccount = this.blockchainAccounts[0];

  }
}
