using Microsoft.AspNetCore.Mvc;
using CoreWCFService1.IServices;
using CoreWCFService1.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using CoreWCFService1; // Replace with the actual namespace of your WCF service


namespace RestApiLayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LookupController : ControllerBase
    {
        private readonly ILookupService _lookupService;

        public LookupController(ILookupService lookupService)
        {
            _lookupService = lookupService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lookup>>> GetAllLookups()
        {
            var lookups = await _lookupService.GetAllLookups();
            return Ok(lookups);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Lookup>> GetLookupById(int id)
        {
            var lookup = await _lookupService.GetLookupById(id);
            if (lookup == null)
            {
                return NotFound();
            }
            return Ok(lookup);
        }

        [HttpPost]
        public async Task<IActionResult> AddLookup([FromBody] Lookup lookup)
        {
            if (lookup == null)
            {
                return BadRequest("Lookup object is null");
            }

            await _lookupService.AddLookup(lookup);
            return CreatedAtAction(nameof(GetLookupById), new { id = lookup.Lookup_id }, lookup);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLookup(int id, [FromBody] Lookup lookup)
        {
            if (lookup == null || id != lookup.Lookup_id)
            {
                return BadRequest();
            }

            var existingLookup = await _lookupService.GetLookupById(id);
            if (existingLookup == null)
            {
                return NotFound();
            }

            await _lookupService.UpdateLookup(lookup);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLookup(int id)
        {
            var lookup = await _lookupService.GetLookupById(id);
            if (lookup == null)
            {
                return NotFound();
            }

            await _lookupService.DeleteLookup(id);
            return NoContent();
        }
    }
}
