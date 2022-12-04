import { useMutation } from "@apollo/client";
import styled from "styled-components";
import {M_CREATEMEMBER} from '../graphql/query';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const CreateMemberContainer=styled.div`
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 400px;
    margin: auto;
    background-color: var(--gray);

    .close_button{
        box-sizing: border-box;
        background-color: var(--gray);
        border: none;
        width: 100%;
        font-size: 20px;
        text-align: right;
        padding: 10px;
    }

    form{
        display: flex;
        flex-direction: column;
        align-items: center;

        .input_wrap{
            margin: 14px 0;
            label{
                display: inline-block;
                text-align: center;
                width: 120px;
            }
            input{
                width: 300px;
                line-height: 30px;
                text-indent: 5px;
                border: none;
                :focus{
                    outline: none;
                }
            }
        }
        button{ 
            width: 100px;
        }
    }
`;

const CreateMember=({setModalOpen})=>{

    const [createMember, {loading, data, error}]= useMutation(M_CREATEMEMBER);

    const onSubmit =async(e)=>{
        e.preventDefault();

        const current = e.target        
        await createMember({variables:{
            role_no:Number(current.role_no.value),
            company_no:Number(current.company_no.value),
            name:current.name.value,
            id:current.id.value,
            password:current.password.value
        }})

        //input창 입력값 삭제
        e.target.reset();
    };

    return(
        <CreateMemberContainer>
                <button className="close_button" onClick={()=>{setModalOpen(false)}}>
                    <FontAwesomeIcon icon={faX} />
                </button>
                <form onSubmit={onSubmit}>
                    <h1>계정 등록</h1>
                    <div className="input_wrap">
                        <label htmlFor="role_no">권한</label>
                        <input id="role_no" type="text" required></input>
                    </div>
                    <div className="input_wrap">
                        <label htmlFor="company_no">회사번호</label>
                        <input id="company_no" type="text" required></input>
                    </div>
                    <div className="input_wrap">
                        <label htmlFor="name">성명</label>
                        <input id="name" type="text" required></input>
                    </div>
                    <div className="input_wrap">
                        <label htmlFor="id">아이디</label>
                        <input id="id" type="text" required></input>
                    </div>
                    <div className="input_wrap">
                        <label htmlFor="password">비밀번호</label>
                        <input id="password" type="password" required></input>
                    </div>
                    <button>등록</button>
                </form>
        </CreateMemberContainer>
    )
};
export default CreateMember;