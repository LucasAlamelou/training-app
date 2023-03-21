import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ButtonTrainning = ({ idTraining, functionClick, uniqueTraining }) => {
    return (
        <>
            <Button uniqueTraining={uniqueTraining}>
                {uniqueTraining ? null : (
                    <Link to={`/training/${idTraining}`}>
                        <FontAwesomeIcon icon={faPlus} color="black" />
                    </Link>
                )}
                <Link to={`/training/${idTraining}`}>
                    <FontAwesomeIcon icon={faPenSquare} color="blue" />
                </Link>
                <ButtonDelete type="button" onClick={() => functionClick(idTraining)}>
                    <FontAwesomeIcon icon={faTrash} color="red" />
                </ButtonDelete>
            </Button>
        </>
    );
};

const Button = styled.td`
    padding: 0.5rem;
    border-left: ${(props) => (props.uniqueTraining ? '1px solid #000' : null)};
    border-bottom: 1px solid #000;
    border-top: 1px solid #000;
    align-items: end;

    > a {
        border-radius: 70%;
        margin-right: 0.5rem;
            
        > svg {
            width: 1.5rem;
            height: 1.5rem;
            }
            :hover {
                animation: pulse 1s infinite;
            } 
        }
    > button {
        border-radius: 70%;
         > svg {
            width: 1.5rem;
            height: 1.5rem;
        }
        :hover {
            animation: pulse 1s infinite;
        }
    }
    @keyframes pulse {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	}
`;
const ButtonDelete = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
`;
