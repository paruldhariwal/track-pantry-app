"use client";

import {
  Box,
  Modal,
  Stack,
  Typography,
  Button,
  TextField,
} from "@mui/material";
//
import { firestore,auth } from "../firebase";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import SignIn from '../signIn';
import {collection,query,doc,getDocs,getDoc,deleteDoc,setDoc} from "firebase/firestore";
import { useEffect, useState } from "react";
import { green } from "@mui/material/colors";


export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [search,setSearch]=useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() });
    });
    setPantry(pantryList);
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updatePantry();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updatePantry();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredPantry=pantry.filter((item)=>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Sign Out Error:', error.message);
    }
  };

  if (!user) {
    return <SignIn />;
  }

  return (
    <Box sx={{  
        backgroundColor: "white",
        backgroundImage: `url('/image.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw'}}>
      <Box
        width="100vw"
        height="100vh"
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={2}
        
      >
        <Button
          variant="contained"
          onClick={handleSignOut}
          sx={{ backgroundColor: "#56595d", border: "1px", fontFamily: "'Roboto', sans-serif", 
            fontWeight: 400, textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          Sign Out
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            width={400}
            bgcolor="white"
            border="2px solid black"
            boxShadow={24}
            p={4}
            display="flex"
            flexDirection="column"
            gap={3}
            sx={{
              transform: "translate(-50%,-50%)",
            }}
          >
            <Typography variant="h6">Add Item</Typography>
            <Stack width="100%" direction="row" spacing={2}>
              <TextField
                id="outlined-basic"
                label="Item"
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  addItem(itemName);
                  setItemName("");
                  handleClose();
                }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>

        <Button
          variant="contained"
          onClick={() => {
            handleOpen();
          }}
          border={"1px solid white"}
          sx={{ backgroundColor: "#56595d",border: "1px", fontFamily: "'Roboto', sans-serif", 
            fontWeight: 400,textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          
        >
          Add New Item
        </Button>
        <TextField
          label="Search Item"
          variant="outlined"

          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          sx={{
            width: "50%",
            marginBottom: 2,
            backgroundColor: "rgba(255, 255, 255, 0.9)", // semi-transparent background color
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // subtle shadow for better visibility
            borderRadius: '8px', 
            border: 'none',

          }}

        />

        <Box  >
          <Box
            width="800px"
            height="100px"
            bgcolor="rgba(97, 54, 19)"
            borderRadius={'8px'}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            
          >
            <Typography
              variant="h2"
              color={"#FFFFF0"}
              textAlign={"center"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{
                fontFamily: "'Roboto', sans-serif", 
                fontWeight: 600, 
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", 
                letterSpacing: "1px", 
                lineHeight: 1.2 
              }}
              
            >
              Pantry Items
            </Typography>
          </Box>
          <Stack width="800px" height="300px" spacing={2} overflow={"auto"}  >
            {filteredPantry.map(({ name, quantity }) => (
              <Box
                key={name}
                width="100%"
                height="150px"
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                bgcolor={"#FFE2C9"}
                paddingX={5}
                paddingY={2}
                border={"1px solid white"}
                borderRadius={'12px'}
                
                
              >
                <Typography variant={"h5"} color={"#333"} textAlign={"left"} flex={2} 
                  sx={{fontFamily: "'Roboto', sans-serif",textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",lineHeight: 1.2,fontWeight: 350}} 
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>

                <Typography variant={"h5"} color={"#333"} textAlign={"center"} flex={2}>
                  {quantity}
                </Typography>
                <Stack direction="row" spacing={2} flex={2} justifyContent={"flex-end"}>
                  <Button
                    variant="contained"
                    onClick={() => addItem(name)}
                    sx={{ backgroundColor: "#c4ad25" ,fontWeight:400,textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)"}}
                  >
                    Add
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => removeItem(name)}
                    sx={{ backgroundColor: "#8b2020", fontWeight:400,textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)"}}
                  >
                    Remove
                  </Button>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
