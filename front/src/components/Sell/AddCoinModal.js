import styled from 'styled-components';
import { useState } from 'react';

function AddCoinModal({ setIsModal, setCoinData, coinData }) {
  const [nationSelected, setNationSelected] = useState('');
  const [coinSelected, setCoinSelected] = useState('');
  const [coinAmount, setCoinAmount] = useState(0);

  const handleChangeNationSelect = (e) => {
    return setNationSelected(e.target.value);
  };

  const handleChangeCoinSelect = (e) => {
    return setCoinSelected(e.target.value);
  };

  const handleChangeCoinAmount = (e) => {
    if (e.target.value < 0) return setCoinAmount(0);
    return setCoinAmount(e.target.value);
  };

  const updateCoin = () => {
    const newCoinData = { ...coinData };

    if (newCoinData[nationSelected]) {
      if (
        newCoinData[nationSelected].length === 2 &&
        newCoinData[nationSelected][0].coinId === coinSelected
      ) {
        newCoinData[nationSelected][0].dealAmount += parseInt(coinAmount);
        setCoinData(newCoinData);
        return setIsModal(false);
      }
      if (
        newCoinData[nationSelected].length === 2 &&
        newCoinData[nationSelected][1].coinId === coinSelected
      ) {
        newCoinData[nationSelected][1].dealAmount += parseInt(coinAmount);
        setCoinData(newCoinData);
        return setIsModal(false);
      }
      if (
        newCoinData[nationSelected].length === 1 &&
        newCoinData[nationSelected][0].coinId === coinSelected
      ) {
        newCoinData[nationSelected][0].dealAmount += parseInt(coinAmount);
        setCoinData(newCoinData);
        return setIsModal(false);
      }
      if (
        newCoinData[nationSelected].length === 1 &&
        newCoinData[nationSelected][0].coinId !== coinSelected
      ) {
        newCoinData[nationSelected].push({
          coinId: coinSelected,
          dealAmount: parseInt(coinAmount),
        });
        setCoinData(newCoinData);
        return setIsModal(false);
      }
    } else {
      newCoinData[nationSelected] = [
        { coinId: coinSelected, dealAmount: parseInt(coinAmount) },
      ];
      setCoinData(newCoinData);
      return setIsModal(false);
    }
  };

  return (
    <StyledDiv>
      <StyledWrapper>
        <StyledAddCoinWrapper>
          <StyledTitle>?????? ??????</StyledTitle>
          <StyledContent>
            <div>
              <StyledContentTitle>??????</StyledContentTitle>
              <StyledSelect onChange={handleChangeNationSelect}>
                <option value="">????????? ??????????????????.</option>
                <option value="JPY">??????</option>
                <option value="CNY">??????</option>
                <option value="USD">??????</option>
              </StyledSelect>
              <StyledContentTitle>?????? ??????</StyledContentTitle>
              {nationSelected === '' && (
                <StyledSelect onChange={handleChangeCoinSelect}>
                  <option value="">?????? ????????? ??????????????????.</option>
                </StyledSelect>
              )}
              {nationSelected === 'JPY' && (
                <StyledSelect onChange={handleChangeCoinSelect}>
                  <option value="">?????? ????????? ??????????????????.</option>
                  <option value={`${process.env.REACT_APP_JPY100}`}>100???</option>
                  <option value={`${process.env.REACT_APP_JPY500}`}>500???</option>
                </StyledSelect>
              )}
              {nationSelected === 'CNY' && (
                <StyledSelect onChange={handleChangeCoinSelect}>
                  <option value="">?????? ????????? ??????????????????.</option>
                  <option value={`${process.env.REACT_APP_CNY1}`}>1??????</option>
                </StyledSelect>
              )}
              {nationSelected === 'USD' && (
                <StyledSelect onChange={handleChangeCoinSelect}>
                  <option value="">?????? ????????? ??????????????????.</option>
                  <option value={`${process.env.REACT_APP_USD10}`}>10??????</option>
                  <option value={`${process.env.REACT_APP_USD25}`}>25??????</option>
                </StyledSelect>
              )}
              <StyledContentTitle>??????</StyledContentTitle>
              <StyledInput
                type="number"
                value={coinAmount}
                min="0"
                onChange={handleChangeCoinAmount}></StyledInput>
            </div>
            <div>
              <StyledContentTitle>????????????</StyledContentTitle>
              <StyledPreviewWrapper>
                {coinSelected === process.env.REACT_APP_JPY100 && (
                  <StyledImg src="/JPY100.png"></StyledImg>
                )}
                {coinSelected === process.env.REACT_APP_JPY500 && (
                  <StyledImg src="/JPY500.png"></StyledImg>
                )}
                {coinSelected === process.env.REACT_APP_CNY1 && (
                  <StyledImg src="/CNY1.png"></StyledImg>
                )}
                {coinSelected === process.env.REACT_APP_USD10 && (
                  <StyledImg src="/USD10.png"></StyledImg>
                )}
                {coinSelected === process.env.REACT_APP_USD25 && (
                  <StyledImg src="/USD25.png"></StyledImg>
                )}
              </StyledPreviewWrapper>
            </div>
          </StyledContent>
        </StyledAddCoinWrapper>

        <StyledBtnWrapper>
          <StyledBtn
            onClick={() => {
              setIsModal((preState) => !preState);
            }}>
            ??????
          </StyledBtn>
          <StyledBtn onClick={updateCoin}>??????</StyledBtn>
        </StyledBtnWrapper>
      </StyledWrapper>
    </StyledDiv>
  );
}

export default AddCoinModal;

const StyledDiv = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  width: 100vw;
  min-height: 2200px;
  background-color: rgba(0, 0, 0, 0.2);
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 20%;
  width: 450px;
  height: 420px;
  margin: 0 auto;
  left: 0;
  right: 0;
  border: 10px solid rgba(42, 193, 188, 0.8);
  border-radius: 20px;
  background-color: white;
  @media (max-width: 490px) {
    width: 340px;
  }
`;

const StyledBtn = styled.button`
  width: 100px;
  height: 50px;
  border: 0;
  border-radius: 10px;
  background-color: rgba(42, 193, 188, 0.5);
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: rgba(42, 193, 188, 0.3);
  }
`;

const StyledBtnWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const StyledAddCoinWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.h3`
  margin-top: 20px;
  box-sizing: border-box;
  font-size: 25px;
  margin-left: 20px;
  font-weight: bold;
`;

const StyledContent = styled.div`
  display: flex;
  width: 300px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  @media (max-width: 490px) {
    width: 280px;
  }
`;

const StyledContentTitle = styled.h4`
  margin: 5px 0 10px 5px;
`;

const StyledSelect = styled.select`
  width: 183px;
  height: 30px;
  margin-bottom: 15px;
`;

const StyledInput = styled.input`
  width: 176px;
  height: 25px;
  text-align: right;
`;

const StyledImg = styled.img`
  width: 40px;
`;

const StyledPreviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  margin-left: 40px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;
