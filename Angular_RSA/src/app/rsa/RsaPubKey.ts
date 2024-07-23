import * as bc from 'bigint-conversion';
import * as bcu from 'bigint-crypto-utils'

export class RsaPubKey {
  e: bigint
  n: bigint

  constructor(e: bigint, n: bigint) {
    this.e = e;
    this.n = n;
  }

  encrypt(m: bigint): bigint {
    return bcu.modPow(m, this.e, this.n);
  }
valVerify(m: bigint) {
        if ((m > this.n))
            console.log("message is greater than n");
        return m > this.n;
    }

  verify(s: bigint): string {
    if (this.valVerify(s)) {
      console.log("Message to verify > n");
      return 'false';
    }
    else
      return bc.bigintToText(bcu.modPow(s, this.e, this.n));
  }

  toJSON(){
    const pubKeyJson = {
      e: bc.bigintToBase64(this.e),
      n: bc.bigintToBase64(this.n)
    }
    return pubKeyJson
  }

  fromJSON(pubKeyJson: { e: string, n: string }){
    return new RsaPubKey(bc.base64ToBigint
     (pubKeyJson.e), bc.base64ToBigint(pubKeyJson.n))
  }


}

