const { token, dm_message, prefix, authorised_ids } = require('./config.json');
const { Client, Partials, GatewayIntentBits } = require('discord.js');
const chalk = require('chalk')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildWebhooks
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
        Partials.User,
    ],
}); 

client.on('ready', client => {
    console.log(chalk.blue(
        `
                                                                                                         
        RRRRRRRRRRRRRRRRR                                                  d:::::d                        
        R::::::::::::::::R                                                 d:::::d                        
        R::::::RRRRRR:::::R                                                d:::::d                        
        RR:::::R     R:::::R                                               d:::::d                         
          R::::R     R:::::R    eeeeeeeeeeee    aaaaaaaaaaaaa      ddddddddd:::::dyyyyyyy           yyyyyyy
          R::::R     R:::::R  ee::::::::::::ee  a::::::::::::a   dd::::::::::::::d y:::::y         y:::::y 
          R::::RRRRRR:::::R  e::::::eeeee:::::eeaaaaaaaaa:::::a d::::::::::::::::d  y:::::y       y:::::y  
          R:::::::::::::RR  e::::::e     e:::::e         a::::ad:::::::ddddd:::::d   y:::::y     y:::::y   
          R::::RRRRRR:::::R e:::::::eeeee::::::e  aaaaaaa:::::ad::::::d    d:::::d    y:::::y   y:::::y    
          R::::R     R:::::Re:::::::::::::::::e aa::::::::::::ad:::::d     d:::::d     y:::::y y:::::y     
          R::::R     R:::::Re::::::eeeeeeeeeee a::::aaaa::::::ad:::::d     d:::::d      y:::::y:::::y      
          R::::R     R:::::Re:::::::e         a::::a    a:::::ad:::::d     d:::::d       y:::::::::y       
        RR:::::R     R:::::Re::::::::e        a::::a    a:::::ad::::::ddddd::::::dd       y:::::::y        
        R::::::R     R:::::R e::::::::eeeeeeeea:::::aaaa::::::a d:::::::::::::::::d        y:::::y         
        R::::::R     R:::::R  ee:::::::::::::e a::::::::::aa:::a d:::::::::ddd::::d       y:::::y          
        RRRRRRRR     RRRRRRR    eeeeeeeeeeeeee  aaaaaaaaaa  aaaa  ddddddddd   ddddd      y:::::y           
                                                                                        y:::::y            
                                                                                       y:::::y             
                                                                                      y:::::y              
                                                                                     y:::::y               
                                                                                    yyyyyyy                        
        `
    ))
})

client.on('messageCreate', message => {
    if(!message.content.toLowerCase().startsWith(prefix) || !message.guild || message.author.bot || !authorised_ids.includes(message.member.user.id)) return 

    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
    if(cmd.length === 0) return 

    if(cmd === 'dm'){
        client.guilds.cache.forEach((g) => {
            g.members.cache.forEach((m) => {
                m.send(`<@${m.user.id}> - ${dm_message}`).catch(err =>  {})
            })
        })
    } else {
        return; 
    }
})

client.login(token).catch(err => {
    console.log(chalk.red(`error logging into token!\n${err}`))
    console.log(chalk.blue(`if you need further help, join discord.gg/8mZ2wsJpdz with ur error message to get it fixed immediately.`))
})
