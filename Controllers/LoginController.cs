using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AndroidApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ApplicationBlocks.Data;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json;

namespace AndroidApi.Controllers
{

    [Route("login/api")]
    public class LoginController : Controller
    {
        // GET api/values
        [HttpGet("login")]        
        public ActionResult<string> Gettest(string userName, string password )
        {
            
            string query = "SELECT * from tblUsers where Email=@userName and Password=@password";
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@userName", userName));
            parameters.Add(new SqlParameter("@password", password));
            DataSet ds = SqlHelper.ExecuteDataset(DBConnection.ConnectionString, CommandType.Text, query, parameters.ToArray());
            DataTable tbl = ds.Tables[0];
             var data = DataTableToJSONWithJSONNet(tbl);
            //Login LoginData = JsonConvert.DeserializeObject<Login>(data);
            return data;
        }

        [HttpPost("signup")]
        public ActionResult<string> Postsignup([FromBody] Login cred)
        {
            string status;
            try
            {
                string query = "insert into tblUsers (Email,Password,FirstName,LastName,Phone) values(@userName,@password,@FirstName,@LastName,@Phone)";
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("@userName", cred.Email));
                parameters.Add(new SqlParameter("@password", cred.Password));
                parameters.Add(new SqlParameter("@FirstName", cred.FirstName));
                parameters.Add(new SqlParameter("@LastName", cred.LastName));
                parameters.Add(new SqlParameter("@Phone", cred.Phone));
                var ds = SqlHelper.ExecuteNonQuery(DBConnection.ConnectionString, CommandType.Text, query,parameters.ToArray());
                status = "success";
            }
            catch (Exception ex)
            {

                status=ex.Message;
            }
        
            return status;
        }
        // GET api/values
        [HttpGet("userList")]
        public ActionResult<string> GetuserList()
        {

            string query = "SELECT * from tblUsers ";
        
            DataSet ds = SqlHelper.ExecuteDataset(DBConnection.ConnectionString, CommandType.Text, query);
            DataTable tbl = ds.Tables[0];
            var data = DataTableToJSONWithJSONNet(tbl);
            //Login LoginData = JsonConvert.DeserializeObject<Login>(data);
            return data;
        }

        public string DataTableToJSONWithJSONNet(DataTable table)
        {
            string JSONString = string.Empty;
            JSONString = JsonConvert. SerializeObject(table);
            return JSONString;
        }
    }
}
