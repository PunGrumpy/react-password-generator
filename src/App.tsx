import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import './App.css'

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  padding: 1rem;
  background-image: url('/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`

const GeneratedPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 2rem;
  backdrop-filter: blur(10px);
`

const GeneratedPasswordText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #f1f1f1;
  word-wrap: break-word;
`

interface ParallaxCardProps extends React.HTMLAttributes<HTMLDivElement> {
  parallaxIntensity?: number
}

const ParallaxCard: React.FC<ParallaxCardProps> = ({
  parallaxIntensity = 10,
  children,
  ...rest
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const { left, top, width, height } = cardRef.current.getBoundingClientRect()
    const x = (event.clientX - left) / width
    const y = (event.clientY - top) / height

    const dx = (x - 0.5) * parallaxIntensity
    const dy = (y - 0.5) * -parallaxIntensity

    cardRef.current.style.transform = `
      translateY(-5px)
      scale(1.05)
      perspective(1000px)
      rotateX(${dy}deg)
      rotateY(${dx}deg)
    `
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = ''
    }
  }

  return (
    <Card
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </Card>
  )
}

const App: React.FC = () => {
  const [passwordLength, setPasswordLength] = useState(12)
  const [generatedPassword, setGeneratedPassword] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const randomPassword = Array(passwordLength)
      .fill('')
      .map(() => String.fromCharCode(Math.floor(Math.random() * 94) + 33))
      .join('')
    setGeneratedPassword(randomPassword)
  }

  return (
    <StyledApp>
      <ParallaxCard>
        <h1>Password Generator</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Password Length:
            <input
              type="number"
              value={passwordLength}
              onChange={event =>
                setPasswordLength(parseInt(event.target.value))
              }
              min="8"
              max="35"
            />
          </label>
          <button type="submit">Generate Password</button>
        </form>
        {generatedPassword && (
          <GeneratedPasswordContainer>
            <GeneratedPasswordText>{generatedPassword}</GeneratedPasswordText>
          </GeneratedPasswordContainer>
        )}
      </ParallaxCard>
    </StyledApp>
  )
}

export default App
