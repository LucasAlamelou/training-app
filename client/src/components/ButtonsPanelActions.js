import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ButtonsPanelActions = ({ idTarget, functionClick, displayShowMore, linkAction }) => {
    return (
        <>
            <Button uniqueTraining={displayShowMore}>
                {displayShowMore ? null : (
                    <Link to={`${linkAction}/${idTarget}`}>
                        <FontAwesomeIcon icon={faPlus} color="black" />
                    </Link>
                )}
                <Link to={`${linkAction}/${idTarget}`}>
                    <FontAwesomeIcon icon={faPenSquare} color="blue" />
                </Link>
                <ButtonDelete type="button" onClick={() => functionClick(idTarget)}>
                    <FontAwesomeIcon icon={faTrash} color="red" />
                </ButtonDelete>
            </Button>
        </>
    );
};

const Button = styled.td`
    width: 15%;
    padding: 0.5rem;
    border-left: ${(props) => (props.displayShowMore ? '1px solid #000' : null)};
    border-bottom: 1px solid #000;
    border-top: 1px solid #000;
    text-align: end;

    > a {
        margin-left: 0.5rem;
        border-radius: 70%;
        margin-right: 0.5rem;
            
        > svg {
            width: 1.3rem;
            height: 1.3rem;
            }
            :hover {
                animation: pulse 1s infinite;
            } 
        }
    > button {
        border-radius: 70%;
         > svg {
            width: 1.2rem;
            height: 1.2rem;
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
