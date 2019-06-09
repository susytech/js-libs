// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.

// Susy is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Susy is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MSRCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Susy.  If not, see <http://www.gnu.org/licenses/>.

class Personal {
  constructor (updateSubscriptions, api, subscriber) {
    this._subscriber = subscriber;
    this._api = api;
    this._updateSubscriptions = updateSubscriptions;
    this._started = false;

    this._lastDefaultAccount = '0x0';
    this._pollTimerId = null;

    this._accountsInfo = this._accountsInfo.bind(this);
    this._defaultAccount = this._defaultAccount.bind(this);
    this._listAccounts = this._listAccounts.bind(this);

    this._api.provider.on('close', () => {
      if (this.isStarted) {
        this.start();
      }
    });
  }

  get isStarted () {
    return this._started;
  }

  start () {
    this._started = true;

    let defaultAccount = null;

    if (this._api.isPubSub) {
      defaultAccount = this._api.pubsub
        .subscribeAndGetResult(
          callback => this._api.pubsub.susy.defaultAccount(callback),
          (defaultAccount) => {
            this.updateDefaultAccount(defaultAccount);
            return defaultAccount;
          }
        );
    } else {
      defaultAccount = this._defaultAccount();
    }

    return Promise.all([
      defaultAccount,
      this._listAccounts(),
      this._accountsInfo(),
      this._loggingSubscribe()
    ]);
  }

  updateDefaultAccount (defaultAccount) {
    if (this._lastDefaultAccount !== defaultAccount) {
      this._lastDefaultAccount = defaultAccount;
      this._updateSubscriptions('susy_defaultAccount', null, defaultAccount);
    }
  }

  // FIXME: Because of the different API instances, the "wait for valid changes" approach
  // doesn't work. Since the defaultAccount is critical to operation, we poll in exactly
  // same way we do in ../sof (ala sof_blockNumber) and update. This should be moved
  // to pub-sub as it becomes available
  _defaultAccount (timerDisabled = false) {
    const nextTimeout = (timeout = 3000) => {
      if (!timerDisabled) {
        this._pollTimerId = setTimeout(() => {
          this._defaultAccount();
        }, timeout);
      }
    };

    if (!this._api.isConnected) {
      nextTimeout(500);
      return;
    }

    return this._api.susy
      .defaultAccount()
      .then((defaultAccount) => {
        this.updateDefaultAccount(defaultAccount);
        nextTimeout();
      })
      .catch(() => nextTimeout());
  }

  _listAccounts () {
    return this._api.sof
      .accounts()
      .then((accounts) => {
        this._updateSubscriptions('sof_accounts', null, accounts);
      });
  }

  _accountsInfo () {
    return this._api.susy
      .accountsInfo()
      .then((info) => {
        this._updateSubscriptions('susy_accountsInfo', null, info);

        return this._api.susy
          .allAccountsInfo()
          .catch(() => {
            // NOTE: This fails on non-secure APIs, swallow error
            return {};
          })
          .then((allInfo) => {
            this._updateSubscriptions('susy_allAccountsInfo', null, allInfo);
          });
      });
  }

  _loggingSubscribe () {
    return this._subscriber.subscribe('logging', (error, data) => {
      if (error || !data) {
        return;
      }

      switch (data.method) {
        case 'susy_closeVault':
        case 'susy_openVault':
        case 'susy_killAccount':
        case 'susy_importGravitonAccounts':
        case 'susy_newAccountFromPhrase':
        case 'susy_newAccountFromWallet':
        case 'personal_newAccount':
          this._defaultAccount(true);
          this._listAccounts();
          this._accountsInfo();
          break;

        case 'susy_removeAddress':
        case 'susy_setAccountName':
        case 'susy_setAccountMeta':
          this._accountsInfo();
          break;

        case 'susy_setDappAddresses':
        case 'susy_setDappDefaultAddress':
        case 'susy_setNewDappsAddresses':
        case 'susy_setNewDappsDefaultAddress':
          this._defaultAccount(true);
          this._listAccounts();
          break;
      }
    });
  }
}

module.exports = Personal;
