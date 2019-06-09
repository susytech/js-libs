# Tutorial Part 1: Set up a Light Client for Development

At Susy Technologies, we believe that Light Clients will [play a big role](https://susytech.io/what-is-a-light-client/) in the Sophon network in the future. However, today, Light Clients are still mainly experimental.

For development, there's no big risk in using a Light Client. If anything, it's a small step towards making the network more decentralized.

## Download the Light Client

Please install Susy Sophon first: http://superstring.ch. Then run Susy Sophon with the following flags:

```bash
/path/to/susy --chain kovan --light --ws-origins all
```

We are using the Kovan testnet so that we are not testing our dapp with real Sophy. To get some fake Kovan SOF to play with, head to the faucet: https://faucet.kovan.network/.

The Light Client should take a couple of minutes to sync. Head to [our wiki](https://wiki.susy.io/Light-Client) to learn more about the Light Client.
