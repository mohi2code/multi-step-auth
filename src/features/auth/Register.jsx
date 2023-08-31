import { Typography } from "antd"
import { Outlet } from "react-router-dom"

const pageStyle = { 
  minHeight: '100vh', 
  display: "flex", 
  flexDirection: 'column' ,
}

function Register() {
  return (
    <main style={pageStyle}>
      <div style={{ margin: 'auto', maxWidth: '600px', width: '100%' }}>
        <Typography.Title level={2} style={{ marginBottom: '3.5rem' }}>Create a new account</Typography.Title>
        <Outlet />
      </div>
    </main>
  )
}

export default Register