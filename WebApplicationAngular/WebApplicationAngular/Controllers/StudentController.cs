using Microsoft.AspNetCore.Mvc;
using WebApplicationAngular.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplicationAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        public static List<Student> STUDENTS = new List<Student>
        {
            new Student{id=1,firstN="tamar",lastN="cohen",address="bar ilan",avg=96,dateL=DateTime.Now,status=true,idSubject=1,phone="0504104545"},
            new Student{id=2,firstN="michal",lastN="mazuz",address="bar ilan",avg=96,dateL=DateTime.Now,status=true,idSubject=2,phone="0504104545"},
            new Student{id=3,firstN="s",lastN="azuz",address="bar ilan",avg=96,dateL=DateTime.Now,status=false,idSubject=1,phone="0504104545"},
            new Student{id=4,firstN="michal",lastN="gazuz",address="bar ilan",avg=96,dateL=DateTime.Now,status=false,idSubject=2,phone="0504104545"},
            new Student{id=5,firstN="tami",lastN="mazuz",address="bar ilan",avg=96,dateL=DateTime.Now,status=true,idSubject=1,phone="0504104545"},
        };
        // GET: api/<StudentController>
        [HttpGet]
        public IEnumerable<Student> Get()
        {
            return STUDENTS;
        }

        // GET api/<StudentController>/5
        [HttpGet("filterByActive/{state}")]
        public IEnumerable<Student> Get(bool state)
        {
            if(state) { return STUDENTS.Where(s => s.status == state); }
            return STUDENTS;
        }

        

        [HttpGet("filterByName/{name}")]
        public IEnumerable<Student> Get(string name)
        {
            if (!string.IsNullOrEmpty(name))
            {
                return STUDENTS.Where(s => s.firstN.Contains(name, StringComparison.OrdinalIgnoreCase) || s.lastN.Contains(name, StringComparison.OrdinalIgnoreCase));
            }
            return STUDENTS;
        }
       

        // GET api/<StudentController>/filterById/{id}
        [HttpGet("filterById/{id}")]
        public Student Get(int id)
        {
            return STUDENTS.FirstOrDefault(s => s.id == id);
        }


        // POST api/<StudentController>
        [HttpPost]
        public void Post([FromBody] Student student)
        {
            STUDENTS.Add(student);
        }

        // PUT api/<StudentController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Student value)
        {
            int index=STUDENTS.FindIndex(s=>s.id==id);
            if (index != -1)
                STUDENTS[index]=value;
        }

        // DELETE api/<StudentController>/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            int index=STUDENTS.FindIndex((s)=>s.id==id);
            if (index != -1)
            {
                STUDENTS.RemoveAt(index);
                return true;
            }

            else
                return false;
        }
    }
}
