import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import {styled} from 'styled-components';


const Menu = styled.div`
  width: ${props => (props.$isShow ? '150px' : '20px')};
  height: 100vh;
  background: lightgreen;
  opacity: 0.6;
  transition: width 0.7s ease-in-out;
`
const  Title = styled.div`
  width: 150px;
  font-weight: bold;
  color: black;
  margin-left: 5px;
`
const  ButtonMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

export default function LeftMenu() {

    const [isShow, setIsShow] = useState(false)
    const [isShowNextText, setIsShowNextText] = useState(false)
    const [textShowArray, settTxtShowArray] = useState(false)
    const TEXTs = import.meta.env.VITE_NAME.split('-')

    useEffect(() => {
      const t_texts = []
      TEXTs.map(text => {
        if (text.length > 1) {
          t_texts.push(...[text, 1000])
        }
      })
      t_texts.push(...[import.meta.env.VITE_NAME, 1500])
      settTxtShowArray(t_texts)
    }, [])

    return (
        <Menu
          $isShow={isShow}
          onMouseEnter={() => {setIsShow(true)}}
          onMouseLeave={() => {setIsShow(false); setIsShowNextText(false)}}
        >
          {!isShow && <ButtonMenu>⚙️</ButtonMenu>}
          {isShow && 
          <>
          <Title>
              <TypeAnimation
                sequence={[
                  ...textShowArray,
                  () => {
                    setIsShowNextText(true)
                  },
                ]}
                wrapper="span"
                cursor={false}
                repeat={'once'}
              />
            </Title>
            {isShowNextText && 
            <Title>
              <TypeAnimation
                sequence={[
                  'в разработке:\n1 добавление меню \nввода карточки задач\n2 изменение данных в полях\n', 1000]
                }
                wrapper="span"
                cursor={true}
                repeat={'once'}
                style={{ whiteSpace: 'pre-line'}}
              />
            </Title>
            }
            
          </>
          }
        </Menu>
    )
  }