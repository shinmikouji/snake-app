import React from 'react'

const Button = ({ status, onStart, onRestart }) => {
  return (
    <div className='button'>
      <button onClick={onStart}>
      {
        status === "gameover" ?
        <button onClick={onRestart}>gameover</button>
        :
        <button onClick={onStart}>start</button>
      }
      </button>
    </div>
  )
}

export default Button