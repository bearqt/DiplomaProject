using System.Data.Common;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext : IdentityDbContext<AppUser>
{
    public DataContext(DbContextOptions options) : base(options)
    {
        
    }

    public DbSet<Chat> Chats { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<UserChat> UserChats { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<UserChat>(x => x.HasKey(uc => new { uc.AppUserId, uc.ChatId }));

        builder.Entity<UserChat>()
            .HasOne(x => x.User)
            .WithMany(x => x.UserChats)
            .HasForeignKey(x => x.AppUserId);

        builder.Entity<UserChat>()
            .HasOne(x => x.Chat)
            .WithMany(x => x.UserChats)
            .HasForeignKey(x => x.ChatId);

        builder.Entity<Message>()
            .HasOne(x => x.Chat)
            .WithMany(x => x.Messages)
            .OnDelete(DeleteBehavior.Cascade);
        
    }
}