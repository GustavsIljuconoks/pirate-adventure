using TypeGen.Core.Converters;

namespace BattleshipPirateAdventure.WebApi.Infrastructure.TypeGen;

public class FormatTypeName : ITypeNameConverter
{
    public string Convert(string name, Type type)
    {
        return name;
    }
}
