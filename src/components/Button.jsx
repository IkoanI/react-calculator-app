import { useContext } from "react"
import { CalcContext } from "../context/CalcContext"

const getStyleName = btn => {
    const className = {
        '=' : "equals",
        'X' : "opt",
        '+' : "opt",
        '-' : "opt",
        '/' : "opt",
    }
    return className[btn]
}

function Button({value}) {
  const {calc, setCalc} = useContext(CalcContext)

  function pointClick(){
    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
    })
  }

  function resetClick(){
    setCalc({
      sign: '',
      num: 0,
      res: 0
    })
  }

  function numberClick(){
    const numberString = value.toString()
    let numberValue
    if(numberString === '0' && calc.num === 0){
      numberValue = 0
    }
    else{
      numberValue = Number(calc.num + numberString)
    }
    setCalc({
      ...calc,
      num:numberValue
    })
  }

  function signClick(){
    setCalc({
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0
    })
  }

  function math(x, y, sign){
    const res = {
      '+':(x, y) => x + y,
      '-':(x, y) => x - y,
      '/':(x, y) => x / y,
      'X':(x, y) => x * y,
    }
    return res[sign](x, y)

  }
  function equalClick(){
    if(calc.res && calc.num){
      setCalc({
        res: math(calc.res, calc.num, calc.sign),
        sign:'',
        num:0
      })
    }
  }

  function percentClick(){
    setCalc({
      num: calc.num / 100,
      res: calc.res / 100,
      sign:''
    })
  }

  function plusMinusClick(){
    setCalc({
      num: calc.num ? calc.num * -1: 0,
      res: calc.num ? calc.num * -1: 0,
      sign:''
    })
  }

  function handleBtnClick(){
      const result = {
        '.':pointClick,
        'C':resetClick,
        'X':signClick,
        '/':signClick,
        '-':signClick,
        '+':signClick,
        '=':equalClick,
        '%':percentClick,
        '+-':plusMinusClick
      }
      if(result[value]){
        result[value]()
      }
      else{
        numberClick()
      }
      
  }

  return (
    <button onClick={handleBtnClick} className={`${getStyleName(value)} button`}> {value} </button>
  )
}

export default Button