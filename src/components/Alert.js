import { Button, CloseButton, Flex, Group, Modal, Text, Title } from "@mantine/core";
import React from "react";

const Alert = (props) => {
  return  <Modal size={"600px"}  opened={props.open} onClose={() => props.setOpen(false)} withCloseButton={false} centered >
            <Flex direction={"row"} justify={"space-between"}>
                <Title sx={{wordSpacing:"1px"}} pl={10} order={3}>{props.title}</Title>
                <CloseButton 
                size={"md"}
                onClick={() => props.setOpen(false)}
                />
            </Flex>
          
             {props.type=="seats"?<Text p={10} pt={15} fz={17} sx={{display:"flex",flexDirection:"row",gap:"5px"}}>Seats : {props.message.map((e)=><Text >{e.seatNo}, </Text>)}</Text>:<Text p={10} pt={15} >{props.message}</Text>}
           
            <Flex direction={"column"} gap={"20px"} justify="center" align="flex-end">
                
                <Flex gap={"10px"} align={"center"} m={10}>
                    <Title order={4} px={"45px"}  c={"blue"} sx={{cursor:"pointer"}} onClick={() => props.setOpen(false)}>Cancel</Title>
                    <Button size={"md"} px={"45px"} sx={{borderRadius:"20px"}}  onClick={()=>{
                        props.setOpen(false);
                        props.setConfirm(true);
                    }}>OK</Button>
                </Flex>
            </Flex>
        </Modal>
};

export default Alert;
