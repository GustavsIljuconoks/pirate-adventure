using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BattleshipPirateAdventure.SQLStorage.Models;

public partial class BattleshipContext : DbContext
{
    public BattleshipContext()
    {
    }

    public BattleshipContext(DbContextOptions<BattleshipContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cell> Cells { get; set; }

    public virtual DbSet<CellState> CellStates { get; set; }

    public virtual DbSet<Game> Games { get; set; }

    public virtual DbSet<GameField> GameFields { get; set; }

    public virtual DbSet<GamePlayer> GamePlayers { get; set; }

    public virtual DbSet<GameState> GameStates { get; set; }

    public virtual DbSet<Orientation> Orientations { get; set; }

    public virtual DbSet<PlayerShootEvent> PlayerShootEvents { get; set; }

    public virtual DbSet<Ship> Ships { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=.;Database=battleship;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cell>(entity =>
        {
            entity.ToTable("cell");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CellStateId).HasColumnName("cell_state_id");
            entity.Property(e => e.GameFieldId).HasColumnName("game_field_id");
            entity.Property(e => e.ShipId).HasColumnName("ship_id");

            entity.HasOne(d => d.CellState).WithMany(p => p.Cells)
                .HasForeignKey(d => d.CellStateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_cell_cell_state");

            entity.HasOne(d => d.GameField).WithMany(p => p.Cells)
                .HasForeignKey(d => d.GameFieldId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_cell_game_field");
        });

        modelBuilder.Entity<CellState>(entity =>
        {
            entity.ToTable("cell_state");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.State)
                .HasMaxLength(50)
                .HasColumnName("state");
        });

        modelBuilder.Entity<Game>(entity =>
        {
            entity.ToTable("game");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.ColumnSize).HasColumnName("column_size");
            entity.Property(e => e.CreationDate)
                .HasColumnType("datetime")
                .HasColumnName("creation_date");
            entity.Property(e => e.GameFinished)
                .HasColumnType("datetime")
                .HasColumnName("game_finished");
            entity.Property(e => e.GameStateId).HasColumnName("game_state_id");
            entity.Property(e => e.Guid)
                .HasMaxLength(50)
                .HasColumnName("guid");
            entity.Property(e => e.NextMove).HasColumnName("next_move");
            entity.Property(e => e.Player1).HasColumnName("player_1");
            entity.Property(e => e.Player2).HasColumnName("player_2");
            entity.Property(e => e.RowSize).HasColumnName("row_size");
            entity.Property(e => e.WinnerId).HasColumnName("winner_id");

            entity.HasOne(d => d.GameState).WithMany(p => p.Games)
                .HasForeignKey(d => d.GameStateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_game_game_state");
        });

        modelBuilder.Entity<GameField>(entity =>
        {
            entity.ToTable("game_field");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.ColumnSize).HasColumnName("column_size");
            entity.Property(e => e.GameId).HasColumnName("game_id");
            entity.Property(e => e.PlayerId).HasColumnName("player_id");
            entity.Property(e => e.RowSize).HasColumnName("row_size");

            entity.HasOne(d => d.Game).WithMany(p => p.GameFields)
                .HasForeignKey(d => d.GameId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_game_field_game");

            entity.HasOne(d => d.Player).WithMany(p => p.GameFields)
                .HasForeignKey(d => d.PlayerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_game_field_game_player");
        });

        modelBuilder.Entity<GamePlayer>(entity =>
        {
            entity.ToTable("game_player");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .HasColumnName("password");
            entity.Property(e => e.Scoring).HasColumnName("scoring");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");
        });

        modelBuilder.Entity<GameState>(entity =>
        {
            entity.ToTable("game_state");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Orientation>(entity =>
        {
            entity.ToTable("orientation");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Orientation1)
                .HasMaxLength(50)
                .HasColumnName("orientation");
        });

        modelBuilder.Entity<PlayerShootEvent>(entity =>
        {
            entity.ToTable("player_shoot_event");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Scoring).HasColumnName("scoring");
            entity.Property(e => e.Shooter).HasColumnName("shooter");
            entity.Property(e => e.ShotAt)
                .HasColumnType("datetime")
                .HasColumnName("shot_at");
            entity.Property(e => e.ShotLocation).HasColumnName("shot_location");
            entity.Property(e => e.TargetShipId).HasColumnName("target_ship_id");

            entity.HasOne(d => d.ShooterNavigation).WithMany(p => p.PlayerShootEvents)
                .HasForeignKey(d => d.Shooter)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_player_shoot_event_game_player");

            entity.HasOne(d => d.ShotLocationNavigation).WithMany(p => p.PlayerShootEvents)
                .HasForeignKey(d => d.ShotLocation)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_player_shoot_event_cell");
        });

        modelBuilder.Entity<Ship>(entity =>
        {
            entity.ToTable("ship");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.HeadLocation).HasColumnName("head_location");
            entity.Property(e => e.HitCount).HasColumnName("hit_count");
            entity.Property(e => e.IsDestroyed).HasColumnName("is_destroyed");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.OrientationId).HasColumnName("orientation_id");
            entity.Property(e => e.Size).HasColumnName("size");

            entity.HasOne(d => d.HeadLocationNavigation).WithMany(p => p.Ships)
                .HasForeignKey(d => d.HeadLocation)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ship_cell");

            entity.HasOne(d => d.Orientation).WithMany(p => p.Ships)
                .HasForeignKey(d => d.OrientationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ship_orientation");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
