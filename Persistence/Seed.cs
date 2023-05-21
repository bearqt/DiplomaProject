using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public static class Seed
{
    public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
    {
        if (!context.UserChats.Any())
        {
            var users = new AppUser[]
            {
                new AppUser
                {
                    UserName = "Bob-The_SlayeR",
                    DisplayName = "Bob",
                    Email = "bob@test.com",
                    Bio = "Hi, I'm Bob! Happy to meet you!",
                    
                },
                new AppUser
                {
                    UserName = "John2001",
                    DisplayName = "John",
                    Email = "John@mail.ru",
                    Bio = "Hi, I'm John! Happy to meet you!",
                },
                new AppUser
                {
                    UserName = "Jane_thE_PRINCESS",
                    DisplayName = "Jane",
                    Email = "janeTheGreat@mail.ru",
                    Bio = "Hi, I'm Jane! Happy to meet you!"
                },
            };
            
            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "HGRMxLa6");
            }
            
            
            var chats = new Chat[]
            {
                new Chat()
                {
                    Title = "Bob n John",
                    AdminUsername = users[0].UserName,
                    CreatedAt = DateTime.UtcNow,
                    DeletedAt = null,
                    Description = "Chat for Bob and John",
                    IsPrivate = false,
                    UserChats = new List<UserChat>
                    {
                        new UserChat()
                        {
                            User = users[0],
                            IsAdmin = true
                        },
                        new UserChat()
                        {
                            User = users[1],
                            IsAdmin = false
                        }
                    }
                },
                new Chat()
                {
                    Title = "Jane's group chat",
                    AdminUsername = users[2].UserName,
                    CreatedAt = DateTime.UtcNow,
                    DeletedAt = null,
                    Description = "Chat for Jane!!!",
                    IsPrivate = false,
                    UserChats = new List<UserChat>
                    {
                        new UserChat()
                        {
                            User = users[2],
                            IsAdmin = true
                        },
                    }
                }
            };

            var messages = new Message[]
            {
                new Message
                {
                    Author = users[0],
                    Chat = chats[0],
                    Body = "I'm Bob and this is my message in our chat!!",
                    CreatedAt = DateTime.UtcNow
                },
                new Message
                {
                    Author = users[1],
                    Chat = chats[0],
                    Body = "I'm John and this is my message in our chat!!",
                    CreatedAt = DateTime.UtcNow
                },
                new Message
                {
                    Author = users[2],
                    Chat = chats[1],
                    Body = "I'm Jane and this is my message in our chat!!",
                    CreatedAt = DateTime.UtcNow
                }
            };

            await context.Messages.AddRangeAsync(messages);
            // await context.Users.AddRangeAsync(users);
            await context.Chats.AddRangeAsync(chats);

            await context.SaveChangesAsync();
        }
    }
}