import React from 'react';
import Eth from "../eth.svg";
import {Link} from "react-router-dom";


function Header(props) {
  const { address, connect } = props;

  return (
    <header>
      <div className="leftH">
        <div className="gridLock">
          gridLock
        </div>
        <Link to="/" className="link">
          <div className="headerItem">Swap</div>
        </Link>
        <Link to="/tokens" className="link">
          <div className="headerItem">Tokens</div>
        </Link>
      </div>
      <div className="rightH">
        <div className="headerItem">
          <img src={Eth} alt="eth" className ="eth" />
          Ethereum
        </div>
        <div className="connectButton" onClick={connect}>
          {address ? (address.slice(0,5) +"..."+address.slice(38)) : "Connect"}
        </div>
      </div>
    </header>

  )
}

export default Header