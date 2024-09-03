using Microsoft.AspNetCore.Mvc;
using CoreWCFService1.IServices;
using CoreWCFService1.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RestApiLayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAllAccounts()
        {
            var accounts = new List<Account>();

            // For simplicity, you may want to implement a GetAllAccounts method in your service
            // For now, assuming you want to fetch a single account by id only.
            // Adjust accordingly if needed.
            return Ok(accounts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccountById(int id)
        {
            var account = await _accountService.GetAccountByIdAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            return Ok(account);
        }

        [HttpPost]
        public async Task<IActionResult> AddAccount([FromBody] Account account)
        {
            if (account == null)
            {
                return BadRequest("Account object is null");
            }

            await _accountService.AddAccountAsync(account);
            return CreatedAtAction(nameof(GetAccountById), new { id = account.AccId }, account);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAccount(int id, [FromBody] Account account)
        {
            if (account == null || id != account.AccId)
            {
                return BadRequest();
            }

            var existingAccount = await _accountService.GetAccountByIdAsync(id);
            if (existingAccount == null)
            {
                return NotFound();
            }

            await _accountService.UpdateAccountAsync(account);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            var account = await _accountService.GetAccountByIdAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            await _accountService.DeleteAccountAsync(id);
            return NoContent();
        }
    }
}

