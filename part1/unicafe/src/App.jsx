import { useState } from 'react'


const Button = ({onClick, text}) => <td><button onClick={onClick}>{text}</button></td>

const Display = ({header}) => <h3>{header}</h3>

const StatisticLine = ({text, value}) => {
  return  (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
  



const Statistics = (props) => {
    const total = props.good + props.neutral + props.bad
    const average = (props.good * 1 + props.neutral * 0 + props.bad * -1) / total
    const positive = (props.good / total) * 100 + " %"


    if (total === 0 ) {
      return (
        <tr>
          <td>No Feedback Given</td>
        </tr>
      )

    }

    return (
      <>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="total" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive}/>
      </>
    )

}
  



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedGood = () => {
    setGood(good + 1)
    console.log(good)
  }

  const feedNeutral = () => {
    setNeutral(neutral + 1)
    console.log(neutral)
  }

  const feedBad = () => {
    setBad(bad + 1)
  }



  return (
    <>

      <Display header="Give Feedback" />
      <table>
        <tbody>
          <tr>
            <Button onClick={feedGood} text="Good"/>
            <Button onClick={feedNeutral} text="Neutral" />
            <Button onClick={feedBad} text="Bad" />
          </tr>
        </tbody>
      </table>
      <Display header="Statistics" />
      <table>
        <tbody>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </tbody>
      </table>

    </>
  
    
  
    


    )
  }

export default App