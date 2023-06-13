import 'cypress-iframe'
import 'cypress-file-upload';
import Login from '../PageObjects/LoginPage.js';

describe('Practise', ()=>{
    it('validate certain things', ()=>{
        cy.visit("https://letcode.in/test");
        cy.title().should("include","LetCode - Testing Hub");
        cy.get('.title.is-title.is-size-1-desktop.is-size-3-mobile.is-size-2-tablet.has-text-weight-bold.has-text-primary')
        .should("contain", "Practice and become pro in test automation");
    })

    it('Input', ()=>{
        cy.visit("https://letcode.in/test");
       cy.get('p.card-header-title.is-size-3').contains("Input");
     
       cy.get(':nth-child(2) > .hero-body > div.container > .columns > :nth-child(1) > app-menu > .card > .card-content > .content > .text')
       .should('contain','Interact with different types of input fields')   //text verifications
         
       
       cy.get(':nth-child(2) > .hero-body > div.container > .columns > :nth-child(1) > app-menu > .card > .card-footer > .card-footer-item')
       .click()

       //sendkey():This command is used to type text into an input field
       cy.get('#fullName').type("Mahesh");
       cy.get('#fullName').should("have.value",'Mahesh')  //Value pads gareko , so have.value 

       //clear(): The .clear() command is used to clear the text from an input field
       cy.get('#join').clear()

       // To use keyboard Tab.
       //npm install -D cypress-plugin-tab
       //Add cypress tab plugin in support/e2e.js file
       cy.get('#join').type("Mahesh ").tab().type("Mahato");

        //validating text is disabled
       cy.get('#noEdit').should('be.disabled');

       //clear the text
       cy.get('#clearMe').clear()

       //Confirm text is readonly
       cy.get('#dontwrite').should('have.attr','readonly');

       })
    
    it('Radio & CheckBox', ()=>{
        cy.visit("https://letcode.in/test");

        cy.get(':nth-child(4) > .hero-body > div.container > .columns > :nth-child(2) > app-menu > .card > .card-footer > .card-footer-item')
        .click()


        cy.get(".title.is-title.is-size-1-desktop.is-size-3-mobile.is-size-2-tablet.has-text-weight-bold.has-text-primary")
        .contains("Radio & Checkbox")

     

        //Select any one
        cy.get('#yes').should('be.visible') //Checking visibility
        cy.get('#yes').check().should('be.checked')  //selecting and checking select or
         
        cy.get('#no').should('be.visible')
        cy.get('input#no').should('not.be.checked') 
        
         //Cofirm you can select only one radio button
         cy.get('#one').should('be.visible') //Checking visibility
         cy.get('#one').check().should('be.checked')  //selecting and checking select or
          
         cy.get('#two').should('be.visible')
         cy.get('input#two').should('not.be.checked') 


         //Find the bug
         cy.get('#nobug').should('be.visible') //Checking visibility
         cy.get('#nobug').check().should('be.checked')  //selecting and checking select or
          
         cy.get('#bug').should('be.visible')
         cy.get('#bug').should('not.checked') 
          
         //Find which one is selected
         cy.get('#foo').should('be.visible')
         cy.get('#foo').check().should('be.checked')
         //cy.get("cy.get(':nth-child(4) > .control > :nth-child(1)')").should('be.checked').and('have.text','foo')

         //Confirm last field is disabled
         cy.get('#maybe').should('be.visible')
         cy.get('#maybe').should('be.disabled')

         //Find if the checkbox is selected?
         cy.get(':nth-child(6) > .checkbox > input').should('be.checked')

       })

    it('Dropdown with select', ()=>{
        cy.visit('https://letcode.in/test');
        cy.get(':nth-child(2) > .hero-body > div.container > .columns > :nth-child(3) > app-menu > .card > .card-footer > .card-footer-item')
        .click()
        cy.get('#fruits').select('Apple');
        cy.get('.subtitle').should('have.text','You have selected Apple')
    })

    it('dropdown without select',()=>{
        cy.visit("https://www.dummyticket.com/dummy-ticket-for-visa-application/")
        cy.get('#select2-billing_country-container').click()
        cy.get('.select2-search__field').type('Italy').type('{enter}')
        cy.get('#select2-billing_country-container').should('have.text','Italy')

    })
    
    it('Auto SUggest dropdown',()=>{
        cy.visit('https://www.wikipedia.org/')
        cy.get('#searchInput').type('Delhi')
        cy.get('.suggestion-title').contains('Delhi University').click()
   })

   it('Dynamic dropdown', ()=>{
    cy.visit('https://www.google.com/')
    cy.get("#APjFqb").type('cypress automation')
    cy.wait(3000)
    cy.get('#Zrbbw > .wM6W7d > span').click()
    
    //cy.get('div.wM6W7d>span').should('have.length',12)
    
   // cy.get('div.wM6W7d>span').each( ($el, index, $list) =>{

   //     if($el.text()=='cypress automation tutorial'){
     //       cy.wrap($el).click() }
         //   cy.get("#APjFqb").should('have.value','cypress automation tutorial') })
  
})


//Js Alert : It will have some text and an 'OK' button
    it('Js alert', ()=>{
    cy.visit("http://the-internet.herokuapp.com/javascript_alerts")
    cy.get("button[onclick='jsAlert()']").click();

    cy.on('window:alert', (t)=>{
        expect(t).to.contains('I am a JS Alert');
    })
    //alert window automatically closed by cypress
    cy.get("#result").should('have.text','You successfully clicked an alert')
})


//Js Confirm alert: It will have text with 'OK'  and 'Cancel' button
it('Js confirm alert', ()=>{
    cy.visit("http://the-internet.herokuapp.com/javascript_alerts")
    cy.get("button[onclick='jsConfirm()']").click();

    cy.on('window:alert', (t)=>{
        expect(t).to.contains('I am a JS Confirm');
    })
    //alert window automatically closed by cypress

    cy.on('window:confirm', ()=>false)   //cypress closes alert windwo using cancel button
    
    cy.get("#result").should('have.text','You clicked: Cancel')
})
  
//Js Prompt Alert: It will have some text with a text box for user input along with 'Ok'

it('Js prompt alert', ()=>{
    cy.visit("http://the-internet.herokuapp.com/javascript_alerts")

    cy.window().then((win)=>{
        cy.stub(win,'prompt').returns('welcome')
    })
    cy.get("button[onclick='jsPrompt()']").click();

    
    //alert window automatically closed by cypress
    cy.get("#result").should('have.text','You entered: welcome')
})

//Authenticated alert
it('Athenticated alert',()=>{
    cy.visit("http://the-internet.herokuapp.com/basic_auth", {
        auth:
        {
            username:'admin',
            password:'admin'
        }
    } );
    cy.get("div[class='example'] p").should('have.contain','Congratulations')
})

it('Handle tabs approach 1',()=>{
    cy.visit("https://the-internet.herokuapp.com/windows")  //parent tab
    cy.get('.example >a').invoke('removeAttr','target').click(); //clicking on link

    cy.url().should('include','https://the-internet.herokuapp.com/windows/new')

    //operations
    cy.go('back');  //back to parent tab
})

it('Handle tabs approach 2',()=>{
    cy.visit("https://the-internet.herokuapp.com/windows")  //parent tab
    
    cy.get('.example >a').then((e)=>{
        let url=e.prop('href')
        cy.visit(url)
    })
    cy.url().should('include','https://the-internet.herokuapp.com/windows/new')
    
    cy.wait(5000)

    //operations
    cy.go('back');  //back to parent tab
})
 
it('handling frames approach 1', ()=>{
    cy.visit('https://the-internet.herokuapp.com/iframe');

    const iframe=cy.get('#mce_0_ifr')
        .its('0.contentDocument.body')
        .should('be.visible')
        .then(cy.wrap)

        iframe.clear().type("Welcome {cmd+a}");
        cy.get("[aria-label='Bold']").click();
})

it('handling frames approach 2 by using custom command', ()=>{
    cy.visit('https://the-internet.herokuapp.com/iframe');

    cy.getIframe('#mce_0_ifr').clear().type("Welcome")
        

       
        cy.get("[aria-label='Bold']").click();
})

it('handling frames approach 3 by using cypress-iframe plugin', ()=>{
    cy.visit('https://the-internet.herokuapp.com/iframe');

    cy.frameLoaded('#mce_0_ifr')

    cy.iframe('#mce_0_ifr').clear().type("Welcome")
        

       
        cy.get("[aria-label='Bold']").click();
})

/*
beforeEach('Login',()=>{
    cy.visit("https://demo.opencart.com/admin/index.php")
    cy.get('#input-username').type('demo')
    cy.get('#input-password').type('demo')
    cy.get("button[type='submit']").click()

    cy.get(".btn-close").click()

    //Customers --> Customers
    cy.get("#menu-customer>a").click();  //customer main menu
    cy.get("#menu-customer>ul>li:first-child").click(); 

})
*/

it('Handle table, Check Number of rows and columns',()=>{
    cy.visit("https://demo.opencart.com/admin/index.php")
    cy.get('#input-username').type('demo')
    cy.get('#input-password').type('demo')
    cy.get("button[type='submit']").click()

    cy.get(".btn-close").click()

    //Customers --> Customers
    cy.get("#menu-customer>a").click();  //customer main menu
    cy.get("#menu-customer>ul>li:first-child").click(); 


    cy.get("table[class='table table-bordered table-hover']>tbody>tr").should('have.length','10')
    cy.get("table[class='table table-bordered table-hover']>thead>tr>td").should('have.length','7')
})

it('Handle table, Check cell data from specific  rows and columns',()=>{

    cy.visit("https://demo.opencart.com/admin/index.php")
    cy.get('#input-username').type('demo')
    cy.get('#input-password').type('demo')
    cy.get("button[type='submit']").click()

    cy.get(".btn-close").click()

    //Customers --> Customers
    cy.get("#menu-customer>a").click();  //customer main menu
    cy.get("#menu-customer>ul>li:first-child").click(); 

    cy.get("table[class='table table-bordered table-hover']>tbody>tr:nth-child(5)>td:nth-child(3)")
    .contains('xvrt@test.com')
  
})

it('Handle table, Read all rows and columns data in the first page',()=>{

    cy.visit("https://demo.opencart.com/admin/index.php")
    cy.get('#input-username').type('demo')
    cy.get('#input-password').type('demo')
    cy.get("button[type='submit']").click()

    cy.get(".btn-close").click()

    //Customers --> Customers
    cy.get("#menu-customer>a").click();  //customer main menu
    cy.get("#menu-customer>ul>li:first-child").click(); 

    cy.get("table[class='table table-bordered table-hover']>tbody>tr")
    .each( ($row, index, $rows)=>{
        cy.wrap($row).within( ()=>{
            cy.get("td").each( ($col, index, $cols)=>{
                cy.log($col.text())
            })
        })
    })
    
})


it('Handle table, pagination', ()=>{
    //find total number of pages

    /*
    let totalPages;
    cy.get(".col-sm-6.text-end").then( (e)=>{
        let mytext=e.text(); //showing 1 to 10 of 13305
    })
    */


    cy.visit("https://demo.opencart.com/admin/index.php")
    cy.get('#input-username').type('demo')
    cy.get('#input-password').type('demo')
    cy.get("button[type='submit']").click()

    cy.get(".btn-close").click()

    //Customers --> Customers
    cy.get("#menu-customer>a").click();  //customer main menu
    cy.get("#menu-customer>ul>li:first-child").click(); 


   let totalPages=5;
   for(let p=1; p<=totalPages;p++)
   {
    if(totalPages>1)
    {
        cy.log("Active Page is=="+p);
        cy.get("ul[class='pagination']>li:nth-child("+p+")").click()
        cy.wait(3000)

        cy.get("table[class='table table-bordered table-hover']>tbody>tr")
        .each( ($row,index,$rows)=>{
            cy.wrap($row).within( ()=>{
                cy.get('td:nth-child(3)').then( (e)=>{
                    cy.log(e.text()); 
                })
            })
        })
    }
   }
})

  it('Mouse Operations, Mouse Hover', ()=>{
    cy.visit("https://demo.opencart.com/")
    cy.get(':nth-child(1) > .dropdown-menu > .dropdown-inner > .list-unstyled > :nth-child(2) > .nav-link')
    .should('not.be.visible')
    cy.get('.nav > :nth-child(1) > .dropdown-toggle').trigger('mouseover').click()
    cy.get(':nth-child(1) > .dropdown-menu > .dropdown-inner > .list-unstyled > :nth-child(2) > .nav-link')
    .should('be.visible')
    
  })
    
it('Mouse Hover, right click',()=>{
    cy.visit("https://swisnl.github.io/jQuery-contextMenu/demo.html")
    cy.get('.context-menu-one').rightclick()
    cy.get('.context-menu-icon-copy > span').should("be.visible")
})

it('FileUpload, Single file Upload',()=>{
    cy.visit('http://the-internet.herokuapp.com/upload');
    cy.get('#file-upload').attachFile('sampleCV.pdf');
    cy.get('#file-submit').click();
    cy.wait(5000);

    cy.get("div[class='example'] h3").should('have.text','File Uploaded!');
})

it('FileUpload, File Rename',()=>{
    cy.visit('http://the-internet.herokuapp.com/upload');
    cy.get('#file-upload').attachFile({filePath:'sampleCV.pdf',fileName:'cv'});
    cy.get('#file-submit').click();
    cy.wait(5000);

    cy.get("div[class='example'] h3").should('have.text','File Uploaded!');
})

it('FileUpload, Drag and drop',()=>{
    cy.visit('http://the-internet.herokuapp.com/upload');
    cy.get('#drag-drop-upload').attachFile('sampleCV.pdf', {subjectType:'drag-n-drop'})
    
})

it('Fixture, Demo test',()=>{
    cy.visit("https://opensource-demo.orangehrmlive.com/")
    
    cy.fixture('orangehrm').then( (data)=>{

        cy.get("input[placeholder='Username']").type(data.username)
        cy.get("input[placeholder='Password']").type(data.password)
        cy.get("button[type='submit']").click()
    
        cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('have.text',data.expected)
    
    })

   })

   

   it('Fixture, Demo test',()=>{
    cy.visit("https://opensource-demo.orangehrmlive.com/")
    
    cy.fixture('orangehrm').then( (data)=>{

        cy.get("input[placeholder='Username']").type(data.username)
        cy.get("input[placeholder='Password']").type(data.password)
        cy.get("button[type='submit']").click()
    
        cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('have.text',data.expected)
    
    })

   })

/*

   it('DatadrivenTest',()=>{
    

    cy.fixture('orangehrm2').then((data)=>{

        cy.visit("https://opensource-demo.orangehrmlive.com/")
         
        data.forEach((userdata)=>{
            cy.get("input[placeholder='Username']").type(userdata.username)
        cy.get("input[placeholder='Password']").type(userdata.password)
        cy.get("button[type='submit']").click()

        if(userdata.username=='Admin' && userdata.password=='admin123')
        {
            cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('have.text',userdata.expected)

            cy.get('.oxd-userdropdown-tab > .oxd-icon').click()  //logout
            cy.get(':nth-child(4) > .oxd-userdropdown-link').click() //logout

        }
        else{
            cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text')
            .should('have.text',userdata.expected)
        }
        })
    })
   })
   */

//Page Objects
   it('Page ObjectLogin', () => {
    cy.visit("https://opensource-demo.orangehrmlive.com/")


    cy.get("input[placeholder='Username']").type('Admin')
    cy.get("input[placeholder='Password']").type('admin123')
    cy.get("button[type='submit']").click()

    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('have.text', 'Dashboard')

})
 
//using pom
it("Page Object LoginTest", ()=>{
    cy.visit("https://opensource-demo.orangehrmlive.com/")

    const ln=new Login();
    ln.setUserName('Admin')
    ln.setPassword('admin123')
    ln.clickSubmit()
    ln.verifyLogin
})
         
})
