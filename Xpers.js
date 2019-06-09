<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Personal Expense</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
    />
    <script
    defer
    src="https://use.fontawesome.com/releases/v5.7.2/js/all.js"
    integrity="sha384-0pzryjIRos8mFBWMzSSZApWtPl/5++eIfzYmTgBBmXYdhvxPc+XcFEk+zJwDgWbP"
    crossorigin="anonymous"
></script>

    </head>
    <body>
            <nav class="navbar navbar-dark bg-dark">
                    <span class="navbar-brand mb-0 h1">Xpers</span>
                    <span class="navbar-brand mb-0 h1" id="headingTotal"></span>
                </nav>
                <div class="container-fluid bg-light" style="min-height: 100vh">
                        <div class="container">
                        <h1 id="headingTotal"></h1>
                        <div class="jumbotron mt-4">
                                <div class="input-group mb-3">
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="inputAmount"
                                        placeholder="Amount spent "
                                        aria-label="Amount spent"
                                        aria-describedby="spent in rupee"
                                    />
                                    <div class="input-group-append">
                                        <span class="input-group-text" id="spent in rupee">₹</span>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="spent at">@</span>
                                    </div>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="inputDesc"
                                        placeholder="Spent On "
                                        aria-label="spent On"
                                        aria-describedby="spent at"
                                    />
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-primary" type="button" id="btnAddExpense">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                           <ul class="list-group" id="expenseTable">

                           </ul>
                     </div>
                </div>
            </div>
        
                       
        <script>
           //Get the heading element
           const headingEl = document.querySelector("#headingTotal")

           // get the refrence to disc element
           const inputDescEl = document.querySelector("#inputDesc")

           // ref to input amount 
           const inputElement = document.querySelector("#inputAmount");

           // Get the ref to table
           const expenseTableEl = document.querySelector("#expenseTable");

           // init value of expense at 0
            let totalExpense = 0;

            // set the heading element to totalExpense

            headingEl.textContent = totalExpense;

            // All Expenses at one place 
            const allExpenses = [];

           // onButtonClick add inputAmount to totalExpense
           function addExpenseToTotal() {
                const expenseItem = {};

           // read value from inputAmount
            const textAmount = inputElement.value;
            
            // read the desc from inputDesc
            const textDesc = inputDescEl.value;

            //Convert it to number
                 const expense = parseInt(textAmount, 10);
                

                // put it in object
                expenseItem.desc = textDesc;
                expenseItem.amount = expense;
                expenseItem.moment = new Date();

               allExpenses.push(expenseItem);

            // add that value to totalExpense
            totalExpense = totalExpense + expense;
           
          // Set the heading element to totalExpense
           const someText = `Total: ${totalExpense}`
           headingEl.textContent = someText;
            renderList(allExpenses); 
           } 

           //Get the btn element
           const element = document.querySelector("#btnAddExpense")
          
           // Listen to click event
           element.addEventListener("click", addExpenseToTotal, false);

           //controller Functions
              function getDateString(moment) {
                  return moment.toLocaleDateString('en-US', { 
                     year: 'numeric',
                     month: 'long',
                     day: 'numeric',
           });
        }

        // Delete Items
        function deleteItem(dateValue) {
         const newArr=allExpenses
                                .filter(expense => expense.moment.valueOf() !== dateValue)
                                renderList(newArr);
        }


   // View Layer


            function renderList(arrofList) {
                 const allExpenseHTML = arrofList.map(expense => createListItem(expense));
                 const joinedAllExpenseHTML = allExpenseHTML.join("");
                 expenseTableEl.innerHTML = joinedAllExpenseHTML;
              }

            function createListItem({ desc, amount, moment }) {
            return `
             <li class="list-group-item d-flex justify-content-between">
					      <div class="d-flex flex-column">
                                                           ${desc}
							<small class="text-muted">${getDateString(moment)}</small>
						</div>
					<div>
								<span class="px-5">
                                                                   ${amount}
								</span>
			     <button
                                 type="button"
                                 class="btn btn-outline-danger btn-sm"
                                 onclick="deleteItem(${moment.valueOf()})"
                             >
									<i class="fas fa-trash-alt"></i>
								</button>
							</div>
						</li>
             `;
           }

           
        </script>
    </body>
    </html>
